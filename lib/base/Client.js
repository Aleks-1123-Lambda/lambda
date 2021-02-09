const Discord = require("discord.js");
class Client extends Discord.Client {
	constructor(clientOptions) {
		super(clientOptions);
		let lib = require("../../lib");
		this.lib = lib;
		this.Logger = lib.modules.Logger;
		this.database = lib.database;
		this.version = lib.data.config.version;
		if (lib.data.config.debug) this.on("debug", lib.modules.Logger.debug);
	}
}
module.exports = Client;