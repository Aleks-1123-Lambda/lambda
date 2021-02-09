const Discord = module.require("discord.js");
const fs = require("fs");
const db = require("quick.db")

module.exports.run = async (client) => {
	client.user.setStatus('dnd');
	let activities_list = [
		"@Lambda",
		"lambdabot.xyz"
	];
	let int = 0;
	setInterval(() => {
		if (int > activities_list.length - 1) int = 0;
		client.user.setActivity(activities_list[int], { type: "WATCHING" });
		int++
	}, 25000);
	if (!client.lib.data.config.debug) client.Logger.ready(`${client.user.tag} Ready!`)


}

module.exports.help = {
	name: "ready"
}