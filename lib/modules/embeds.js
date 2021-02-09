const Discord = require("discord.js");
let errors = require("../errors")
const ImageURLOptions = {
	format: "png",
	dynamic: true,
	size: 1024
};
class Embeds {
	/**
	 * Constructor usage
	 * @param {object} author - Message Author
	 * @param {object} channel - Channel for sending the embed message
	 * @param {object} member - Message Member Object (unused)
	 */
	constructor(opts) {
		if (opts.author instanceof Discord.User == false || opts.channel instanceof Discord.TextChannel == false || opts.member instanceof Discord.GuildMember == false) throw new errors.EmbedsError("You not provided a valid arguments")
		this.opts = opts;
		this.author = opts.author;
		this.channel = opts.channel;
		this.member = opts.member;
	};
	/**
	 * Create EmbedMessage
	 * @param {string} title - MessageEmbed title
	 * @param {string} text  - MessageEmbed Description
	 * @param {string} footer - MessageEmbed Footer
	 * @param {string} color  - MessageEmbed Color
	 * @returns {object} - Message Object
	 */
	async create(title, text, footer = "", color = "GREEN") {
		if (!title || !text) throw new errors.EmbedsError("You not provided a valid arguments")
		const embed = new Discord.MessageEmbed()
			.setDescription(text)
			.setColor(color)
			.setTitle(title)
			.setAuthor(`${this.author.tag}`, `${this.author.displayAvatarURL(ImageURLOptions)}`)
		embed.setFooter(footer);
		let msg = await this.channel.send(embed);
		return msg;
	};
	/**
	 * Error Create
	 * @param {string} text - MessageEmbed Description
	 * @param {string} color - MessagEmbed Color
	 * @returns {object} - Message Object
	 */
	async error(text, color = "RED") {
		if (!text) throw new errors.EmbedsError("You not provided a valid arguments")
		const embed = new Discord.MessageEmbed()
			.setDescription(text)
			.setColor(color)
			.setTitle(`<:check_red:732717921440235584> Error`)
			.setAuthor(`${this.author.tag}`, `${this.author.displayAvatarURL(ImageURLOptions)}`)
		let msg = await this.channel.send(embed);
		return msg;
	};
};
module.exports = Embeds;