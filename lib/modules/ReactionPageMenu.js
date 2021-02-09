const Discord = require("discord.js");
const ImageURLOptions = {
	format: "png",
	dynamic: true,
	size: 1024
};
class Menu {
	static defaultReactions = { back: '⬅️', next: '➡️', stop: '⏹', info: 'ℹ️', backInfo: '↩️' }

	constructor(opts = {}) {
		const { channel, userID, pages = [], page = 0, time = 120000, reactions = Menu.defaultReactions } = opts
		if (!channel || !userID) throw new Error("ReactionPageMenuError: not provided channel or userID")
		this.channel = channel;
		this.pages = pages;
		this.time = time;
		this.reactions = reactions;
		this.page = page;
		this.catch = false;
		channel.send(pages[page]).then(msg => {
			this.msg = msg
			this.addReactions()
			this.createCollector(userID)
		}).catch(this.catch)
	}
	/**
	 * Selecting a page
	 * @param {number} pg - Page number to select
	 * @returns {boolean} - Boolean
	 */
	select(pg = 0) {
		if (this.page !== "info") {
			this.page = pg
			this.msg.edit(this.pages[pg]).catch(this.catch)
			return true;
		}
	}
	/**
	 * Creating a reaction collector
	 * @param {string} uid - User ID
	 */
	createCollector(uid) {
		const collector = this.msg.createReactionCollector((r, u) => u.id == uid, { time: this.time })
		this.collector = collector;
		collector.on('collect', r => {
			if (r.emoji.name == this.reactions.back) {
				if (this.page != 0) this.select(this.page - 1)
			} else if (r.emoji.name == this.reactions.next) {
				if (this.page < this.pages.length - 1) this.select(this.page + 1)
			} else if (r.emoji.name == this.reactions.info) {
				let e = new Discord.MessageEmbed()
					.setTitle("ℹ️ Informacje o menu na reakcje")
					.setDescription("Spis reakcji:\n ⬅️ - Poprzednia strona\n➡️ - Nastepna strona\n⏹ - Zatrzymywanie menu\nℹ️ - Informacje o użyciu menu\n↩️ - Powrót z informacji do menu")
					.setFooter(`Jeśli wystąpił jakiś błąd to zgłoś go komenda [p]botreport <treść>`)
					.setColor("GREEN")
					if (this.msg.embeds && this.msg.embeds[0] && this.msg.embeds[0].author && this.msg.embeds[0].author.name && this.msg.embeds[0].author.iconURL) e.setAuthor(`${this.msg.embeds[0].author.name}`, `${this.msg.embeds[0].author.iconURL}`)
				this.msg.edit(e);
				this.page = "info";
			} else if (r.emoji.name == this.reactions.backInfo) {
				if (this.page == "info") {
					this.page = 0;
					this.select(0)
				}
			} else if (r.emoji.name == this.reactions.stop) collector.stop()
			r.users.remove(uid).catch(this.catch)
		})
		collector.on('end', () => {
			this.msg.reactions.removeAll().catch(this.catch)
		})
	}
	/**
	 * Adding reactions
	 */
	async addReactions() {

		if (this.reactions.back) await this.msg.react(this.reactions.back).catch(this.catch)
		if (this.reactions.stop) await this.msg.react(this.reactions.stop).catch(this.catch)
		if (this.reactions.next) await this.msg.react(this.reactions.next).catch(this.catch)
		if (this.reactions.info) await this.msg.react(this.reactions.info).catch(this.catch)
		if (this.reactions.info) await this.msg.react(this.reactions.backInfo).catch(this.catch)
	}
}
module.exports = Menu;