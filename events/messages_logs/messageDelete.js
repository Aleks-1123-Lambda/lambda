const Discord = require('discord.js');
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };

module.exports.run = async (client, message, defaultSettings) => {
	const guildConf = client.database.settings.ensure(message.guild.id, defaultSettings);
	if (!message.guild || !message.author || message.author.bot) return

	if (!guildConf.channelLogs) return;
	if (message.partial) message.fetch()
	if (message.author) {
		if (message.author.bot) return;
	} else {
		return;
	}
	let attachments = "";
	if (message.attachments.size > 0) {
		message.attachments.forEach(att => {
			attachments += `${att.proxyURL}\n`
		})
	} else attachments = "Brak"
	let out = client.channels.cache.get(client.database.settings.get(message.guild.id, "channelLogs").replace("<#", "").replace(">", ""));
	let msgContent = message.content || "Wiadomość zawiera embed";
	if (message.attachments.size > 0) files = "Tak"
	msgContent = Discord.Util.cleanContent(msgContent, message);
	msgContent = Discord.Util.escapeMarkdown(msgContent);
	if (msgContent.length > 1048) msgContent = "Zbyt duże by wyświetlić"

	const embed = new Discord.MessageEmbed()
		.setColor('GREEN')
		.setTitle('<:icon_msg_rm:724362248989966346> Wiadomość usunięta!')
		.addField("Autor:", `${message.author.username} (\`${message.author.id}\`)`)
		.addField("Kanal:", `${message.channel}`)
		.setThumbnail(message.author.displayAvatarURL(ImageURLOptions))

		.addField(`Treść wiadomosci`, `${msgContent}`)
		.addField("Pliki:", `${attachments || "Brak"}`)

		.addField(`ID:`, `[${message.id}](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)

	if (out) out.send(embed);

}

module.exports.help = {
	name: "messageDelete"
}