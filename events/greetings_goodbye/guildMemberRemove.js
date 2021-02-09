const Discord = module.require("discord.js");
const moment = module.require("moment");
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };
module.exports.run = async (member, client, defaultSettings) => {

	function replaceAll(string, search, replacement) {
		return string.split(search).join(replacement);
	}
	const guildConf = client.database.settings.ensure(member.guild.id, defaultSettings);
	let goodbyeMessage = guildConf.goodbyeMessage;
	let goodbyeMessageTitle = guildConf.goodbyeMessageTitle;
	let goodbyeChannel = guildConf.goodbyeChannel
	if (goodbyeChannel && goodbyeMessage && goodbyeMessageTitle) {
		goodbyeMessage = replaceAll(goodbyeMessage, "{{user}}", `<@${member.user.id}>`);
		goodbyeMessage = replaceAll(goodbyeMessage, "{{user.name}}", member.user.username);
		goodbyeMessage = replaceAll(goodbyeMessage, "{{user.tag}}", member.user.tag);
		goodbyeMessage = replaceAll(goodbyeMessage, "{{guild}}", member.guild)
		goodbyeMessage = replaceAll(goodbyeMessage, "{{guild.users}}", member.guild.members.cache.size)
		goodbyeMessage = replaceAll(goodbyeMessage, "{{user.id}}", member.user.id);
		goodbyeMessage = replaceAll(goodbyeMessage, "{{user.discrim}}", member.user.discriminator);
		goodbyeMessage = replaceAll(goodbyeMessage, "{{date}}", moment().format("DD.MM.YYYY HH:mm:ss"));
		goodbyeMessage = replaceAll(goodbyeMessage, "{{user.created}}", moment(Date.parse(member.user.createdAt), "", "en").format("DD.MM.YYYY HH:mm:ss"));
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{user}}", `<@${member.user.id}>`);
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{user.name}}", member.user.username);
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{user.id}}", member.user.id);
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{guild}}", member.guild)
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{guild.users}}", member.guild.members.cache.size)
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{user.tag}}", member.user.tag);
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{user.discrim}}", member.user.discriminator);
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{date}}", moment().format("DD.MM.YYYY HH:mm:ss"));
		goodbyeMessageTitle = replaceAll(goodbyeMessageTitle, "{{user.created}}", moment(Date.parse(member.user.createdAt), "", "en").format("DD.MM.YYYY HH:mm:ss"));
		goodbyeChannel = goodbyeChannel.replace("<#", "");
		goodbyeChannel = goodbyeChannel.replace(">", "");
		const out = client.channels.cache.get(goodbyeChannel);
		if (!out) return;
		const embed = new Discord.MessageEmbed()
			.setTitle(goodbyeMessageTitle)
			.setColor("RED")
			.setThumbnail(member.user.displayAvatarURL(ImageURLOptions))
			.setDescription(goodbyeMessage)

		out.send(embed).catch();
	}
}

module.exports.help = {
	name: "guildMemberRemove"
}