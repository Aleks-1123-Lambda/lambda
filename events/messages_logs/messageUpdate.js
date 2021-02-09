const Discord = require('discord.js');
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };
let globalPerms = {
	1: "1: użytkownik",
	2: "2: Moderator",
	3: "3: Administrator",
	4: "4: Właściciel Serwera",
	5: "5: Programista (Globalne)"
}
module.exports.run = async (client, oldMessage, newMessage, defaultSettings) => {
	const perms = client.lib.data.perms;
	const guildConf = client.database.settings.ensure(oldMessage.guild.id, defaultSettings);
	let message = newMessage;
	if (!message.guild || !message.author || message.author.bot) return
	let mem = message.member;

	if (message.partial) message.fetch()

	if (!oldMessage.author) return
	if (oldMessage.author.bot) return;
	/* Permissions */
	let userPerms = 1;
	if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("BAN_MEMBERS")) userPerms = 2;
	if (message.member.hasPermission("ADMINISTRATOR")) userPerms = 3;
	if (guildConf.modRole && message.member.roles.cache.some(role => role.id === guildConf.modRole.replace("<@&", "").replace(">", ""))) userPerms = 2;
	if (guildConf.adminRole && message.member.roles.cache.some(role => role.id === guildConf.adminRole.replace("<@&", "").replace(">", ""))) userPerms = 3;
	if (message.member.user.id == message.guild.ownerID) userPerms = 4;
	if (perms.programmer.includes(message.author.id)) userPerms = 5;

	let antyinviteChannels = guildConf.antyinviteChannels;
	let antyinviteChannelCheck = false;
	if (antyinviteChannels) {
		antyinviteChannels.forEach(r => {
			if (message.channel.id == r.id) antyinviteChannelCheck = true;
		});
	}
	let antyinviteRoles = guildConf.antyinviteRoles;
	let antyinviteRolesCheck = false;
	if (antyinviteRoles) {
		antyinviteRoles.forEach(r => {
			if (mem.roles.cache.some(role => role.id === r.id)) antyinviteRolesCheck = true;
		});
	}
	/* Antyinvite */
	if (guildConf.antyinvite == "on") {
		let antyinviteChannels = guildConf.antyinviteChannels;
		let antyinviteChannelCheck = false;
		if (antyinviteChannels) {
			antyinviteChannels.forEach(r => {
				if (message.channel.id == r.id) antyinviteChannelCheck = true;
			});
		}
		let antyinviteRoles = guildConf.antyinviteRoles;
		let antyinviteRolesCheck = false;
		if (antyinviteRoles) {
			antyinviteRoles.forEach(r => {
				if (message.member.roles.cache.some(role => role.id === r.id)) antyinviteRolesCheck = true;
			});
		}
		if (message.content.toLowerCase().includes("discord.gg") || message.content.toLowerCase().includes("discordapp.com/invite") || message.content.toLowerCase().includes("discord.com/invite") || message.content.toLowerCase().includes("nadiscord.pl") || message.content.toLowerCase().includes("invite.wtf") || message.content.toLowerCase().includes("invite.xyz") || message.content.toLowerCase().includes("invitelink.xyz") || message.content.toLowerCase().includes("discordapp.com/oauth2") || message.content.toLowerCase().includes("discord.com/oauth2") || message.content.toLowerCase().includes("invite.gg") || message.content.toLowerCase().includes("nadsc.pl")) {
			if (guildConf.antyinvite == "on" && userPerms < 3 && !antyinviteChannelCheck && !antyinviteRolesCheck) {
				let event = client.events.get("invitePosted");
				event.run(client, guildConf, message);
				return;
			}
		}
	}
	/* Anty link */

	if (guildConf.antylink == "on") {
		let antyinviteChannels = guildConf.antylinkChannels;
		let antyinviteChannelCheck = false;
		if (antyinviteChannels) {
			antyinviteChannels.forEach(r => {
				if (message.channel.id == r.id) antyinviteChannelCheck = true;
			});
		}
		let antyinviteRoles = guildConf.antylinkRoles;
		let antyinviteRolesCheck = false;
		if (antyinviteRoles) {
			antyinviteRoles.forEach(r => {
				if (message.member.roles.cache.some(role => role.id === r.id)) antyinviteRolesCheck = true;
			});
		}

		if (message.content.toLowerCase().includes("http") || message.content.toLowerCase().includes("www.") || new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(message.content)) {
			if (guildConf.antylink == "on" && userPerms < 3 && !antyinviteChannelCheck && !antyinviteRolesCheck) {
				let event = client.events.get("linkPosted");
				event.run(client, guildConf, message);
				return;
			}
		}
	}

	/* Message Logs */
	if (!guildConf.channelLogs) return;
	let attachments = "";
	if (message.attachments.size > 0) {
		message.attachments.forEach(att => {
			attachments += `${att.proxyURL}\n`
		})
	} else attachments = "Brak"
	if (oldMessage.content == newMessage.content) return;
	let out = client.channels.cache.get(client.database.settings.get(oldMessage.guild.id, "channelLogs").replace("<#", "").replace(">", ""));
	let msgContent1 = oldMessage.content || "Wiadomość zawiera embed";
	msgContent1 = Discord.Util.cleanContent(msgContent1, oldMessage);
	msgContent1 = Discord.Util.escapeMarkdown(msgContent1);
	let msgContent2 = newMessage.content || "Wiadomość zawiera embed";
	msgContent2 = Discord.Util.cleanContent(msgContent2, newMessage);
	msgContent2 = Discord.Util.escapeMarkdown(msgContent2);
	if (msgContent1.length > 1048) msgContent1 = "Zbyt duże by wyświetlić"
	if (msgContent2.length > 1048) msgContent2 = "Zbyt duże by wyświetlić"

	const embed = new Discord.MessageEmbed()
		.setColor('GREEN')
		.setTitle('<:icon_msg_update:724362337716535416> Wiadomość edytowana!')
		.addField("Autor:", `${message.author.username} (\`${message.author.id}\`)`)
		.addField("Kanał:", `${message.channel}`)
		.setThumbnail(message.author.displayAvatarURL(ImageURLOptions))

		.addField(`Stara wiadomość`, `${msgContent1}`)
		.addField(`Nowa wiadomość`, `${msgContent2}`)
		.addField("Pliki:", `${attachments}`)
		.addField(`ID:`, `[${oldMessage.id}](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`)
	if (out) out.send(embed);

}
module.exports.help = {
	name: "messageUpdate"
}