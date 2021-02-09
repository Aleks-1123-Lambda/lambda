const db = require("quick.db")

module.exports.run = async (member, client) => {
	let muted = await db.fetch(`muted-${member.user.id}-${member.guild.id}`)

	if (muted === true) {

		let guildConf = client.database.settings.ensure(member.guild.id, client.database.defaultSettings)
		let muterole = guildConf.mutedRole;
		if (!muterole) return;
		muterole = muterole.replace("<@&", "");
		muterole = muterole.replace(">", "");

		let role = member.guild.roles.cache.get(muterole)
		if (!role) return;
		member.roles.add(role).catch(false)
	}
}
module.exports.help = {
	name: "muteLeave"
}