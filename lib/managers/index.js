let lib = require("../../lib")
const Discord = require("discord.js")
/**
 * Starting a managers
 * @param {object} client - Discord.Client object
 */
module.exports.initialize = async (client) => {
	if (!client || client instanceof Discord.Client == false) throw new lib.errors.LibraryError("Invalid client variable!")
	require("./GiveawayManager")(client)
	require("./EventsManager")(client);
	require("./MessageManager")(client);
	require("./CooldownsManager")(client);
	require("./MusicManager")(client);
}