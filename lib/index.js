const Discord = require("discord.js")
const lib = require("../lib")
let globalPerms = {
	1: "1: Użytkownik",
	2: "2: Moderator",
	3: "3: Administrator",
	4: "4: Właściciel Serwera",
	5: "5: Programista (Globalne)"
}
let ImageURLOptions = {
	format: "png",
	dynamic: true,
	size: 1024
};
module.exports = {
	functions: require('./modules/functions.js'),
	handlers: require("./handlers"),
	data: require("./data"),
	embeds: require("./modules/embeds"),
	managers: require("./managers"),
	database: require("./modules/database"),
	inlineReply: require("./modules/InlineReply"),
	globalPerms: globalPerms,
	base: require("./base"),
	ImageURLOptions: ImageURLOptions,
	modules: require("./modules"),
	errors: require("./errors")
}
/**
 * Starting a library
 * @param {object} client Client object
 */
module.exports.initialize = async (client) => {
	if (!client || client instanceof Discord.Client == false) throw new lib.errors.LibraryError("Invalid client variable!")
	client.Logger.initialize("Starting bot....")
	require("./handlers").initialize(client)
	require("./managers").initialize(client);
	require("../server");
	client.Logger.initialize("Bot started");

}