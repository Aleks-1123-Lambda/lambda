module.exports.run = async (client, channel) => {
	if (channel) {
		if (channel.guild) {
			let guildConf = client.database.settings.ensure(channel.guild.id, client.database.defaultSettings)
			let muterole = guildConf.mutedRole;
			if (!muterole) return;
			muterole = muterole.replace("<@&", "");
			muterole = muterole.replace(">", "");
			let role = channel.guild.roles.cache.get(muterole)
			if (!role) return console.log("t");
			channel.updateOverwrite(role, { SEND_MESSAGES: false, SPEAK: false }).catch(r => {
			})
		}
	}

}
module.exports.help = {
	name: "guildMuteUpdate"
}