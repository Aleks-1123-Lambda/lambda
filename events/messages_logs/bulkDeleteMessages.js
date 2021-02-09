const Discord = require("discord.js")
const PastebinAPI = require('pastebin-js');
const hastebin = require("hastebin-gen");
module.exports.run = async (client, defaultSettings, message, messages) => {
	const guildConf = client.database.settings.ensure(message.guild.id, defaultSettings);
	let content = `Logi usunięcia wielu wiadomości.\n Kanał: ${message.channel.name} (${message.channel.id})\nSerwer: ${message.guild.name} (${message.guild.id})\n\n\n\n\n`;
	let int = 0;
	messages.forEach(msg => {
		if (msg.partial) msg.fetch()
			if (msg.author && !msg.author.bot) {
				int++;
				let attachments = "";
				if (message.attachments.size > 0) {
					message.attachments.forEach(att => {
						attachments += `${att.proxyURL}\n`
					})
				} else attachments = "Brak"
				let msgContent = msg.content || "Wiadomośc zawiera embed"
				msgContent = Discord.Util.cleanContent(msgContent, msg);
				msgContent = Discord.Util.escapeMarkdown(msgContent);
				content += `Wiadomość #${int}\nAutor: ${msg.author.tag} (${msg.author.id})\nPliki: ${attachments}\nID Wiadomości: ${msg.id}\nTreść: ${msgContent}\n\n\n`
		}
	});
	if (int == 0) return;
	let out = client.channels.cache.get(guildConf.channelLogs.replace("<#", "").replace(">", ""));
	if (!out) return;
	hastebin(`${content}`, "txt")
		/*
			pastebin.createPaste({
				text: content,
				title: `Bulk Delete Messages. Server: ${message.guild.name} (${message.guild.id})`,
				public: 1
			})
		*/
		.then(function (url) {
			const embed = new Discord.MessageEmbed()
				.setColor('GREEN')
				.setTitle('<:icon_msg_rm:724362248989966346> Usunieto wiele wiadomości')
				.addField("Lista wiadomoścci:", `[klik](${url})`)
				.addField("Kanał:", `${message.channel}`)

			//.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)

;
			out.send(embed);
		})
		.catch(console.error)
}
module.exports.help = {
	name: "bulkDeleteMessages"
}