const Discord = require('discord.js');
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };
const db = require("quick.db")
module.exports.run = async (client, oldMessage, newMessage, defaultSettings) => {
	let message = newMessage;
	const guildConf = client.database.settings.ensure(message.guild.id, defaultSettings);
	if (guildConf.snipe == "off") return;
	if (!message.guild || !message.author || message.author.bot) return

	if (message.partial) message.fetch()
	if(oldMessage.content.length > 100) oldMessage.content = "Wiadomość była zbyt długa aby znalazła się tutaj";
	if(newMessage.content.length > 100) newMessage.content = "Wiadomość była zbyt długa aby znalazła się tutaj";
	
	if (!db.get(message.guild.id + ".snipe-edit")) db.set(message.guild.id + ".snipe", {})
	if (!db.get(`${message.guild.id}.snipe-edit.${message.channel.id}`)) db.set(`${message.guild.id}.snipe-edit.${message.channel.id}`, [])
	if (db.get(`${message.guild.id}.snipe-edit.${message.channel.id}`).length > 20) {
		db.delete(`${message.guild.id}.snipe-edit.${message.channel.id}`)
	} else {
		db.push(`${message.guild.id}.snipe-edit.${message.channel.id}`, {
			oldContent: oldMessage.content,
			newContent: newMessage.content,
			author: message.author.id,
		})
	}
}

module.exports.help = {
	name: "snipeUpdate"
}