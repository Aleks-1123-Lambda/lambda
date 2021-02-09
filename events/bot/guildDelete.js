const Discord = module.require("discord.js")
const moment = module.require("moment");

module.exports.run = async (client, guild) => {
	client.users.fetch(guild.ownerID)
	let gowner = `${client.users.cache.get(guild.ownerID).tag} (\`${client.users.cache.get(guild.ownerID).id}\`)`
	let users = guild.memberCount
	let embedLogs = new Discord.MessageEmbed()
		.setTitle('Alert!')
		.setDescription(`Bot wyszedl z serwera`)
		.addField("Serwer", `${guild.name} (\`${guild.id}\`)`)
		.addField("Uzytkownicy:", `${users}`)
		.setThumbnail(`${guild.iconURL() || 'https://cdn.discordapp.com/embed/avatars/0.png'}`)
		.addField("Wlasciciel serwera", `${gowner}`)
		.setColor('YELLOW')
	let channelLogs = client.channels.cache.get(client.lib.data.channels.servers)
	channelLogs.send(embedLogs)

}
module.exports.help = {
	name: "guildDelete"
}