const lib = require("./lib");
const Base = lib.base;
const editJsonFile = require("edit-json-file");
let opts = {
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
};
const client = new Base.Client(opts);

/* Initializing Bot */

lib.initialize(client);

/* Logging to discord */

client.login(lib.data.tokens.bot);

client.on("ready", () => {
	setInterval(function () {

		let file = editJsonFile(__dirname + "/stats.json");
		const os = require('os');
		let usedMem = os.totalmem() - os.freemem();
		let memoryPercent = Math.floor((usedMem / os.totalmem()) * 100);
		let cpuUssuage = result = (process.cpuUsage().user / 1024 / 1024).toFixed(2);
		let availableMemory = ((os.freemem() / 1024) / 1024).toFixed(0);
		let usedMemory = ((usedMem / 1024) / 1024).toFixed(0);
		let usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
		file.set("servers", client.guilds.cache.size);
		file.set("commands", client.commands.size)
		file.set("users", client.users.cache.size);
		file.set("readyAt", client.readyTimestamp);
		file.set("channels", client.channels.cache.size);
		file.set("ping", client.ws.ping);
		file.set("diskUse.memoryPercent", memoryPercent);
		file.set("diskUse.cpuUssuage", cpuUssuage);
		file.set("diskUse.availableMemory", availableMemory);
		file.set("diskUse.usedMemory", usedMemory);
		file.set("diskUse.usedRAM", usedRAM);
		file.set("botID", client.user.id)
		file.save();
	}, 10000);
})
module.exports = {
	client
}