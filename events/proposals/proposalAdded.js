const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };
const Discord = module.require("discord.js");

module.exports.run = async (client, guildConf, message) => {

	/* User nick */
	let nick = message.member.nickname;
	if (!nick || nick == null) nick = message.author.username;
	if (message.content.startsWith("//")) {
		/* Comments */

		let tts = message.content;
		tts = tts.replace("//", "")
		tts = Discord.Util.cleanContent(tts, message);

		tts = Discord.Util.removeMentions(tts);
		message.channel.createWebhook(nick, {
			avatar: message.author.displayAvatarURL(),
		}).then(webhook => {
			webhook.send(tts, {
				files: message.attachments.map(a => a.url)
			}).then(m => {
				message.delete();
				webhook.delete();
			});
		}).catch(err => {
			return embeds.error("Wystapił błąd, bot nie ma permisji do tworzenia webhooków")
		});


	} else {
		/* Proposal */

		const embed = new Discord.MessageEmbed()
			.setTitle("Propozycja")
			.setColor("GREEN")

			.setDescription(`${message.content}`)

			.setFooter("Komentarz: //<treść>");

		if (message.attachments.size > 0) embed.setImage(message.attachments.array()[0].proxyURL)
		message.channel.createWebhook(nick, {
			avatar: message.author.displayAvatarURL(),
		}).then(webhook => {
			if (message.attachments.size) {
				webhook.send(embed).then(m => {
					m.react("732717837898088520");
					m.react("732717921440235584");
					message.delete();
					webhook.delete();
				});
			} else {
				webhook.send(embed).then(m => {
					m.react("732717837898088520");
					m.react("732717921440235584");
					message.delete();
					webhook.delete();
				});
			}

		}).catch(err => {
			return embeds.error("Wystapił błąd, bot nie ma permisji do tworzenia webhookow")
		});


	}
}

module.exports.help = {
	name: "proposalAdded"
}