const Discord = require("discord.js");

const moment = module.require("moment");

module.exports.run = async (guild, client, defaultSettings) => {
	client.users.fetch(guild.ownerID)
	let gowner = `${client.users.cache.get(guild.ownerID).tag} (\`${client.users.cache.get(guild.ownerID).id}\`)`
	let users = guild.memberCount



	let embedLogs = new Discord.MessageEmbed()
		.setTitle('Alert!')
		.setDescription(`Bot dolaczył na serwer.`)
		.addField("Serwer", `${guild.name} (\`${guild.id}\`)`)
		.setThumbnail(`${guild.iconURL() || 'https://cdn.discordapp.com/embed/avatars/0.png'}`)
		.addField("Wlasciciel serwera", `${gowner}`)
		.addField("Uzytkownicy:", `${users}`)
		//.addField("", ``)
		.setColor('YELLOW')
	let channelLogs = client.channels.cache.get(client.lib.data.channels.servers)
	channelLogs.send(embedLogs)
	const guildConf = client.database.settings.ensure(guild.id, defaultSettings);
	let channel = guild.channels.cache.find(c => c.rawPosition == 0 && c.type == "text");
	if (!channel) return;
	if (guild.systemChannel) channel = guild.systemChannel;


	//let channel = client.channels.cache.get(guild.systemChannelID || channelID);
	const embed = new Discord.MessageEmbed()
		.setTitle("Lambda")
		.setColor("GREEN")
		.setDescription("Dziękujemy za dodanie bota!")
		.addField("Konfiguracja", `\`${guildConf.prefix}config\``)
		.addField("Lista komend:", `\`${guildConf.prefix}pomoc\``)
	channel.send(embed);
}

module.exports.help = {
	name: "guildCreate"
}
