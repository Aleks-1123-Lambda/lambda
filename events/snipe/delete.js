const Discord = require('discord.js');
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };
const db = require("quick.db")
module.exports.run = async (client, message, defaultSettings) => {
	const guildConf = client.database.settings.ensure(message.guild.id, defaultSettings);
	if (guildConf.snipe == "off") return;
	if (!message.guild || !message.author || message.author.bot) return

	if (message.partial) message.fetch()
	if(message.content.length > 100) message.content = "Wiadomość była zbyt długa aby znalazła się tutaj"

	if (!db.get(message.guild.id + ".snipe-delete")) db.set(message.guild.id + ".snipe", {})
	if (!db.get(`${message.guild.id}.snipe-delete.${message.channel.id}`)) db.set(`${message.guild.id}.snipe-delete.${message.channel.id}`, [])
	if (db.get(`${message.guild.id}.snipe-delete.${message.channel.id}`).length > 20) {
		db.delete(`${message.guild.id}.snipe-delete.${message.channel.id}`)
	} else {
		db.push(`${message.guild.id}.snipe-delete.${message.channel.id}`, {
			content: message.content,
			author: message.author.id,
		})
	}
}

module.exports.help = {
	name: "snipeDelete"
}