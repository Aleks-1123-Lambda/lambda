const Discord = module.require("discord.js");
const moment = module.require("moment");
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };
module.exports.run = async (member, client, defaultSettings) => {

	function replaceAll(string, search, replacement) {
		return string.split(search).join(replacement);
	}
	const guildConf = client.database.settings.ensure(member.guild.id, defaultSettings);
	//if (!guildConf.welcomeChannel) return;
	let welcomeMessage = guildConf.welcomeMessage;
	let welcomeChannel = guildConf.welcomeChannel;
	let welcomeMessageTitle = guildConf.welcomeMessageTitle;
	welcomeChannel = welcomeChannel.replace("<#", "");
	welcomeChannel = welcomeChannel.replace(">", "");
	out = client.channels.cache.get(welcomeChannel);
	/* Working mention in embed */
	if (welcomeMessage.includes("{{user}}")) {
		if (out) out.send(`${member}`).then((m) => {
			m.delete();
		});
	};

	if (out && welcomeChannel && welcomeMessage && welcomeMessageTitle) {
		welcomeMessage = replaceAll(welcomeMessage, "{{user}}", `<@${member.user.id}>`);
		welcomeMessage = replaceAll(welcomeMessage, "{{user.name}}", member.user.username);
		welcomeMessage = replaceAll(welcomeMessage, "{{user.tag}}", member.user.tag);
		welcomeMessage = replaceAll(welcomeMessage, "{{guild.users}}", member.guild.members.cache.size)
		welcomeMessage = replaceAll(welcomeMessage, "{{guild}}", member.guild)
		welcomeMessage = replaceAll(welcomeMessage, "{{user.id}}", member.user.id);
		welcomeMessage = replaceAll(welcomeMessage, "{{user.discrim}}", member.user.discriminator);
		welcomeMessage = replaceAll(welcomeMessage, "{{date}}", moment().format("DD.MM.YYYY HH:mm:ss"));
		welcomeMessage = replaceAll(welcomeMessage, "{{user.created}}", moment(Date.parse(member.user.createdAt), "", "en").format("DD.MM.YYYY HH:mm:ss"));
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{user}}", `<@${member.user.id}>`);
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{user.id}}", member.user.id);
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{user.name}}", member.user.username);
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{guild.users}}", member.guild.members.cache.size)
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{user.tag}}", member.user.tag);
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{guild}}", member.guild)
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{user.discrim}}", member.user.discriminator);
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{date}}", moment().format("DD.MM.YYYY HH:mm:ss"));
		welcomeMessageTitle = replaceAll(welcomeMessageTitle, "{{user.created}}", moment(Date.parse(member.user.createdAt), "", "en").format("DD.MM.YYYY HH:mm:ss"));

		const embed = new Discord.MessageEmbed()
			.setTitle(welcomeMessageTitle)
			.setColor("GREEN")
			.setThumbnail(member.user.displayAvatarURL(ImageURLOptions))
			.setDescription(welcomeMessage)

		if (out) out.send(embed).catch(console.error);
	}
	let autorole = guildConf.autorole;
	if (autorole) {
		autorole.forEach(r => {
			member.roles.add(r).catch(false);
		})
	}
}

module.exports.help = {
	name: "guildMemberAdd"
}