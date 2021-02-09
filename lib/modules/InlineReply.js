const Discord = require("discord.js");
let errors = require("../errors")
const fetch = require("node-fetch");
class Reply {
	/**
	 * Inline reply constructor
	 * @param {object} message - Message Object
	 * @param {boolean} mention - Reply will tag the user boolean
	 */
	constructor(opts) {
		if (!opts.message || opts.message instanceof Discord.Message == false) throw new errors.InlineReplyError("You not provided a vaild arguments")

		this.message = opts.message;
		this.mention = opts.mention || false;
	}
	/**
	 * Create a reply
	 * @param {string} text - Reply text
	 * @returns {object} - Message Object
	 */
	async create(text) {
		let msg = this.message;
		if (!msg || msg instanceof Discord.Message == false) throw new errors.InlineReplyError("You not provided a vaild arguments")
		let body = {
			"message_reference": {
				"channel_id": msg.channel.id,
				"guild_id": msg.guild.id,
				"message_id": msg.id
			},
			"nonce": msg.id,
			"allowed_mentions": {
				"parse": [
					"users",
					"roles",
					"everyone"
				],
				"replied_user": this.mention
			}
		}
		if (text instanceof Discord.MessageEmbed) body['embed'] = text;
		else body['content'] = text;
		const req = await fetch(`https://discord.com/api/v8/channels/${msg.channel.id}/messages`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bot ${msg.client.lib.data.tokens.bot}`
			}
		}).then(r => r.json())
		let message = await msg.channel.messages.fetch(req.id);
		return message;
	}
}
module.exports = Reply;