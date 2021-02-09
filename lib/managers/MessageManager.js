const Discord = require("discord.js");
const db = require("quick.db")
const parsems = require("parse-ms");

const lib = require("../../lib");
const perms = lib.data.perms;
const globalPerms = lib.globalPerms;
const ImageURLOptions = {
	format: "png",
	dynamic: true,
	size: 1024
};

module.exports = async (client) => {
	client.on("message", message => {
		if (message.author.bot || message.channel.type === "dm" || !message.content || !message.guild.me.hasPermission("SEND_MESSAGES") || !message.guild.me.hasPermission("EMBED_LINKS")) return;

		/* Enmaps ensure */
		client.database.serverVerify.ensure(client.user.id, [], "id");
		const guildCommands = client.database.guildCommands.ensure(message.guild.id, client.database.defaultOffCommands);
		const todo = client.database.todo.ensure(message.author.id, client.database.defaultToDo);
		const autorespodners = client.database.autoresponder.ensure(message.guild.id, client.database.defaultAutoResponder);
		const guildConf = client.database.settings.ensure(message.guild.id, client.database.defaultSettings);
		const profile = client.database.profile.ensure(message.author.id, client.database.defaultProfile);
		const sverify = client.database.serverVerify.get(client.user.id, `server-${message.guild.id}`);
		const guildCase = client.database.guildCase.ensure(message.guild.id, client.database.defaultCase);
		const userCase = client.database.userCase.ensure(message.author.id, client.database.defaultUserCase);
		const gban = client.database.gban.ensure(message.author.id, client.database.defaultGban);

		/* message.guild.settings variable */
		message.guild.settings = guildConf;
		/* Prefixes */
		const prefixes = [guildConf.prefix || "&".toLowerCase(), `<@!${client.user.id}>`, `<@${client.user.id}>`];
		/* Embeds Definition*/
		let embeds = new client.lib.embeds({
			channel: message.channel,
			author: message.author,
			member: message.member
		})

		let inlineReply = new client.lib.inlineReply({
			message: message
		});

		/* Permissions handler */
		let userPerms = 1;
		if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("BAN_MEMBERS")) userPerms = 2;
		if (message.member.hasPermission("ADMINISTRATOR")) userPerms = 3;
		if (guildConf.modRole && message.member.roles.cache.some(role => role.id === guildConf.modRole.replace("<@&", "").replace(">", ""))) userPerms = 2;
		if (guildConf.adminRole && message.member.roles.cache.some(role => role.id === guildConf.adminRole.replace("<@&", "").replace(">", ""))) userPerms = 3;
		if (message.member.user.id == message.guild.ownerID) userPerms = 4;
		if (perms.programmer.includes(message.author.id)) userPerms = 5;
		let permsYoursText = globalPerms[userPerms];

		/* Bot mention */
		const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (message.content.match(prefixMention)) {
			const mention = new Discord.MessageEmbed()
				.setTitle("Lambda")
				.setDescription(`**Cześć jestem Lambda**\n**Prefix:** \`${guildConf.prefix}\`\n**Lista komend:** \`${guildConf.prefix}help\`\n**Informacje o bocie:** \`${guildConf.prefix}bot\`\n**Ping:** \`${message.guild.shard.ping}\`\n**Serwery:** \`${client.guilds.cache.size}\`\n**Dodaj bota:** [klik](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)\n**Dołącz na serwer developerski:** [klik](http://aleks.ovh/null)`)
				.setColor("GREEN")
				.setFooter(client.version)
				.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)



			return message.channel.send(mention);
		}

		/* Server verification */
		let sverified = false;
		if (sverify && sverify.verified) sverified = true;
		message.guild.sverified = sverified;


		/* Antyinvite system */

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
		/* Antylink system */

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

		/* Proposals */

		if (guildConf.proposalsChannels) {
			let proposalsChannels = guildConf.proposalsChannels;
			let proposalsChannelCheck = false;
			if (proposalsChannels) {
				proposalsChannels.forEach(r => {
					if (message.channel.id == r.id) proposalsChannelCheck = true;
				});
			}
			let proposalSend = true;
			const content2 = message.content.toLowerCase();
			const prefix2 = prefixes.find(p => content2.startsWith(p));
			if (prefix2) {
				const args = message.content.slice(prefix2.length).trim().split(/ +/g);
				const command = args.shift().toLowerCase();
				const cmd2 = client.commands.get(command) || client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(command));
				if (cmd2) proposalSend = false;
			}
			if (proposalsChannelCheck && !message.author.bot) {
				if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
					proposalSend = false;
					const embederr1 = new Discord.MessageEmbed()
						.setTitle("<:check_red:732717921440235584> Brak uprawnień")
						.setColor("RED")
						.setDescription(`Nie posiadasz wymaganych uprawnień do wykonania tej komendy\n\nWymagane: \`${permsNeededText}\`\nPosiadasz: \`${permsYoursText}\``)
						.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)
					message.channel.send(embederr1);
				}
				/* Running event */
				if (proposalSend) {

					let event = client.events.get("proposalAdded");
					event.run(client, guildConf, message);
				} else {
					message.delete()
				}

			}
		}


		/* Autoresponders */
		let autoresponders = client.database.autoresponder.get(message.guild.id, `autoResponders`)
		if (autoresponders) {
			autoresponders.forEach(c => {
				c = parseInt(c)
				let actualar = client.database.autoresponder.get(message.guild.id, `ar-${c}`)
				if (actualar !== "removed" && message.content.toLowerCase() === actualar.message.toLowerCase()) inlineReply.create(actualar.reply)
			})
		}

		/* Command handler */
		const content = message.content.toLowerCase();
		const prefix = prefixes.find(p => content.startsWith(p));
		if (!prefix) return;
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(command));

		/* "X" reaction if command not found */
		if (!cmd) {
			if (guildConf.disabledCommandInfo || "on" == "on") message.react("732717921440235584")
			return
		};
		/* Flags */
		message.flags = [];
		while (args[0] && args[0][0] === "-") {
			message.flags.push(args.shift().slice(1));
		}
		/*Maintenance Mode*/
		if (db.fetch("maintenance") && userPerms !== 5) {
			const embed = new Discord.MessageEmbed()
				.setTitle("Przerwa techniczna")
				.setDescription("Nie możesz teraz użyć tej komendy. Spróbuj ponownie później")
				.setColor("RED")
				.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)



				.setFooter("Maintenance Mode")
			return message.channel.send(embed)
		}

		/* Global ban */
		if (gban.status && userPerms !== 5) {
			let banned = new Discord.MessageEmbed()
				.setTitle("<:RedFlag:708255358035951617> Gban")
				.setDescription(`Powód: ${gban.reason}\nDeveloper: ${gban.author}\nData: \`${gban.date}\``)
				.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)



				.setColor('RED')
			return message.channel.send(banned)
		}
		/* Commands & bot perms */
		let cmdBotPerm = cmd.conf.botPerm || "SEND_MESSAGES";
		let cmdPermLevel = cmd.conf.permissionLevel || 1;
		message.author.permissionLevel = userPerms;
		let permsNeededText = globalPerms[cmdPermLevel];

		/* User Permissions Check */
		if (cmdPermLevel > userPerms) {
			const embederr1 = new Discord.MessageEmbed()
				.setTitle("<:check_red:732717921440235584> Brak uprawnień")
				.setColor("RED")
				.setDescription(`Nie posiadasz wymaganych uprawnień do wykonania tej komendy\n\nWymagane: \`${permsNeededText}\`\nPosiadasz: \`${permsYoursText}\``)
				.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)



			return message.channel.send(embederr1);
		}

		/* Bot permissions */
		if (!message.guild.me.hasPermission(cmdBotPerm)) {
			const embederr1 = new Discord.MessageEmbed()
				.setTitle("<:check_red:732717921440235584> Brak uprawnień")
				.setColor("RED")
				.setDescription(`Nie posiadasz wymaganych uprawnień do wykonania tej komendy\n\nWymagane: \`${permsNeededText}\`\nPosiadasz: \`${permsYoursText}\``)
				.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)



			return message.channel.send(embederr1);
		}

		/* Cooldowns */
		let tm = db.fetch(`${message.author.id}_${cmd.conf.name}`);
		let timeout = (cmd.conf.cooldown || 3) * 1000;
		if (userPerms !== 5 && tm && timeout - (Date.now() - tm) > 0) {
			let time = parsems(timeout - (Date.now() - tm));
			embeds.error(`Poczekaj jeszcze \`${time.seconds}\` sekund przed użyciem tej komendy`)
			db.set(`${message.author.id}_${cmd.conf.name}`, Date.now())
			return
		}
		db.set(`${message.author.id}_${cmd.conf.name}`, Date.now())
		/* Channels off Commands */
		if (guildConf.channelsOffCommands) {
			let disabledChannel = guildConf.channelsOffCommands;
			let channelCommandEnable = true;
			if (disabledChannel) disabledChannel.forEach(c => {
				if (c.id == message.channel.id) channelCommandEnable = false;
			})
			if (!channelCommandEnable && message.author.permissionLevel < 3) return embeds.error(`Wszystkie komendy na tym kanale zostały wyłączone przez administratora`)

		}

		/* Command run */
		if (cmd) {
			try {
				cmd.run(client, message, args, guildConf);
				//client.Logger.cmd(`${message.author.tag} (${message.author.id}) -> ${cmd.conf.name} -> ${message.guild.name} (${message.guild.id})`)
			} catch (error) {
				const criterror = new Discord.MessageEmbed()
					.setTitle(`<:check_red:732717921440235584> Error`)
					.setColor("RED")
					.setDescription(`Wystapił błąd w komedzie. Wiadomość została wysłana do developerów!`)
					.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)
				message.channel.send(criterror);


			}
		}
	});
}