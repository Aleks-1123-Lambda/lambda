const fs = require("fs");

const ascii = require("ascii-table");
const Discord = require("discord.js");
const lib = require("../../lib");

/**
 * Starting a command handler
 * @param {object} client - Discord.Client object
 */
module.exports = (client) => {
	if (!client || client instanceof Discord.Client == false) throw new lib.errors.HandlerError("Invalid client variable!")
	client.commands = new Discord.Collection();
    fs.readdirSync("./commands/").forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../../commands/${dir}/${file}`);
            if (pull.conf && pull.conf.name) {
                client.commands.set(pull.conf.name, pull);
            } else {
                continue;
            }
        }
    });

}
