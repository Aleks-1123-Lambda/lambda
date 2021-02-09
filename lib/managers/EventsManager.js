const Discord = require("discord.js")
const { inspect } = module.require('util');
const editJsonFile = require("edit-json-file");
const request = require("request")
module.exports = async (client) => {
	/* Guilds */
	client.on("guildCreate", (guild) => {
		let event = client.events.get("guildCreate");
		event.run(guild, client, client.database.defaultSettings);
	});
	client.on("guildDelete", (guild) => {
		let event = client.events.get("guildDelete");
		event.run(client, guild, client.database.defaultSettings);
	});
	/* Powitania oraz pożegnania */
	client.on('guildMemberAdd', member => {
		let event = client.events.get("guildMemberAdd");
		event.run(member, client, client.database.defaultSettings);
	});

	client.on("guildMemberRemove", (member) => {
		let event = client.events.get("guildMemberRemove");
		event.run(member, client, client.database.defaultSettings);
	});
	/* Logi, antyinvite, antylink */
	client.on("messageUpdate", (oldMessage, newMessage) => {
		if (!oldMessage || !newMessage) return
		if (oldMessage.channel.type === "dm") return;
		let event = client.events.get("messageUpdate");
		event.run(client, oldMessage, newMessage, client.database.defaultSettings);
	});

	client.on("messageDelete", (message) => {
		if (message.channel.type === "dm") return;
		let event = client.events.get("messageDelete");
		event.run(client, message, client.database.defaultSettings);
	});

	client.on("messageDeleteBulk", (messages) => {
		let message = messages.array()[0];
		if (message.channel.type === "dm") return;
		let event = client.events.get("bulkDeleteMessages");
		event.run(client, client.database.defaultSettings, message, messages);
	});
	/* Errors */
	client.on("error", (error) => {
		let event = client.events.get("error");
		event.run(client, error);
	});

	client.on("warn", (warn) => {
		let event = client.events.get("warn");
		event.run(client, warn);
	});
	/* Mute */
	client.on("guildCreate", (guild) => {
		let event = client.events.get("guildMuteSetup");
		event.run(client, guild);
	});

	client.on("channelCreate", (channel) => {
		let event = client.events.get("guildMuteUpdate");
		event.run(client, channel);
	});
	client.on("guildMemberAdd", (member) => {
		let event = client.events.get("muteLeave")
		event.run(member, client)
	});
	/* Errors handlers */

	if (client.lib.data.config.errors) {
		process.on('uncaughtException', (err, origin) => {
			const channel = client.channels.cache.get(client.lib.data.channels.errors2);

			const nl = '!!NL!!';
			const nlPattern = new RegExp(nl, 'g');
			formatsend(origin);
			function formatsend(result) {
				const inspected = inspect(result, { depth: 0 }).replace(nlPattern, '\n')
				console.log(`Uncaught Exception: ${inspected}`)

				const embed = new Discord.MessageEmbed()
					.setTitle(`UncaughtException`)
					.setDescription(`UncaughtException occured in main thread. Caught error:\n\n\`\`\`${err}\`\`\`\n\nException origin: \n\n\`\`\`${inspected}\`\`\``)
					.setColor(`RED`)
				if (channel) channel.send(embed);
			}
		});
		process.on('unhandledRejection', (reason, promise) => {
			const channel = client.channels.cache.get(client.lib.data.channels.errors2);

			const nl = '!!NL!!';
			const nlPattern = new RegExp(nl, 'g');
			formatsend(promise);
			function formatsend(result) {
				const inspected = inspect(result, { depth: 0 }).replace(nlPattern, '\n')
				console.log(`Uncaught Exception: ${inspected}`)
				const embed = new Discord.MessageEmbed()
					.setTitle(`UnhandledRejection`)
					.setDescription(`UncaughtException occured in main thread. Rejection at:\n\n\`\`\`${inspected}\`\`\`\n\nReason: \n\n\`\`\`${reason}\`\`\``)
					.setColor(`RED`)

				if (channel) channel.send(embed);
			}
		});
		process.on('uncaughtExceptionMonitor', (err, origin) => {
			const channel = client.channels.cache.get(client.lib.data.channels.errors2);

			const nl = '!!NL!!';
			const nlPattern = new RegExp(nl, 'g');
			formatsend(origin);
			function formatsend(result) {
				const inspected = inspect(result, { depth: 0 }).replace(nlPattern, '\n')

				console.log(`Uncaught Exception: ${err}`)

				const embed = new Discord.MessageEmbed()
					.setTitle(`UncaughtExceptionMonitor`)
					.setDescription(`UncaughtException occured in main thread. Caught error:\n\n\`\`\`${err}\`\`\`\n\nException origin: \n\n\`\`\`${inspected}\`\`\``)
					.setColor(`RED`)
				if (channel) channel.send(embed);
			}
		});
	}
	/* Ready */
	client.once('ready', () => {
		let event = client.events.get("ready");
		event.run(client);
	});
	/* Snipe */
	client.on("messageDelete", (message) => {
		if (message.channel.type === "dm") return;
		let event = client.events.get("snipeDelete");
		event.run(client, message, client.database.defaultSettings);
	});
	client.on("messageUpdate", (oldMessage, newMessage) => {
		if (!oldMessage || !newMessage) return
		if (oldMessage.channel.type === "dm") return;
		let event = client.events.get("snipeUpdate");
		event.run(client, oldMessage, newMessage, client.database.defaultSettings);
	});
}