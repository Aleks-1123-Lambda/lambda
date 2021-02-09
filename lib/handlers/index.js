const lib = require("../../lib")
const Discord = require("discord.js")
/**
 * Starting a handlers
 * @param {object} client Client object
 */
module.exports.initialize = async (client) => {
	if (!client || client instanceof Discord.Client == false) throw new lib.errors.LibraryError("Invalid client variable!")

	require("./command")(client);
	require("./events")(client);
}