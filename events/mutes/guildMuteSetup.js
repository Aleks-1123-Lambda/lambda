const Discord = require("discord.js")

module.exports.run = async (client, guild) => {
	let guildConf = client.database.settings.ensure(guild.id, client.database.defaultSettings)
	let mutedrole = guildConf.mutedRole;
	if (mutedrole) return

	guild.roles.create({
		data: {
			name: "Wyciszony",
			color: "#ff1100",
			permissions: []
		}
	}).then(role => {
		guild.channels.cache.forEach(channel => {
			channel.updateOverwrite(role, { SEND_MESSAGES: false, SPEAK: false }).catch(r => {

			})
			if (!role) client.database.settings.set(guild.id, ``, `mutedRole`)
			if (role) client.database.settings.set(guild.id, `<@&${role.id}>`, `mutedRole`)
		})
	}).catch(false)
}
module.exports.help = {
	name: "guildMuteSetup"
}