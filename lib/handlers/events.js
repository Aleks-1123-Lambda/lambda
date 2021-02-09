const fs = require("fs");

const ascii = require("ascii-table");
const Discord = require("discord.js");

/**
 * Starting a event handler
 * @param {object} client - Discord.Client object
 */
module.exports = (client) => {
	if (!client || client instanceof Discord.Client == false) throw new lib.errors.HandlerError("Invalid client variable!")
	client.events = new Discord.Collection();
    fs.readdirSync("./events/").forEach(dir => {
        const commands = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../../events/${dir}/${file}`);
            if (pull.help.name) {
                client.events.set(pull.help.name, pull);
				//client.Logger.log(`Command ${pull.conf.fileName} loaded`, "cmd")
            } else {
				//client.Logger.log(`Command ${pull.conf.fileName} not loaded`, "cmd")
                continue;
            }
        }
    });

}
