const express = require("express");
const vhost = require("vhost")
const app = express();
const lib = require("./lib");

/* Lambda Sites */
try {
	/* Main site */
	const stats = require("./stats.json");
	const site = express();
	site.set('view engine', 'ejs');
	site.set('views', __dirname, '/www/public');
	site.use(express.static(__dirname + '/www/public'));
	site.get("/", (req, res) => {
		res.render("www/public/index", {
			channels: stats.channels,
			commands: stats.commands,
			users: stats.users,
			servers: stats.servers
		})
	});
	site.post("/", (req, res) => {
		res.render("www/public/index", {
			channels: stats.channels,
			commands: stats.commands,
			users: stats.users,
			servers: stats.servers
		})
	});
	/* stats */
	site.get("/stats", (req, res) => {
		res.sendFile(__dirname + "/stats.json")
	})
	site.post("/stats", (req, res) => {
		res.sendFile(__dirname + "/stats.json")
	})
	/* Invite */
	site.get("/invite", (req, res) => {
		res.redirect("https://discord.com/api/oauth2/authorize?client_id=777266484770111488&permissions=8&scope=bot")
	})
	site.post("/invite", (req, res) => {
		res.redirect("https://discord.com/api/oauth2/authorize?client_id=777266484770111488&permissions=8&scope=bot")
	})
	/* Support */
	site.get("/support", (req, res) => {
		res.redirect("https://discord.gg/XG2b7VCMKe")
	})
	site.post("/support", (req, res) => {
		res.redirect("https://discord.gg/XG2b7VCMKe")
	})
	/* Server Verification */
	site.get("/server-verification", (req, res) => {
		res.redirect("https://docs.lambdabot.xyz/server-verification/wstep")
	})
	site.post("/server-verification", (req, res) => {
		res.redirect("https://docs.lambdabot.xyz/server-verification/wstep")
	})
	/* Dashboard */
	const dash = express()
	dash.get("/", (req, res) => {
		res.status(401).json({ message: "Unathorized", powered_by: "aleks.ovh" })
	})
	if (!lib.data.config.domain) throw new TypeError("Domain in lib/data/config.json is required to start the bot!");
	if (!lib.data.config.port) throw new TypeError("Port in lib/data/config.json is required to start the bot!")

	app.use(vhost(lib.data.config.domain, site));
	app.use(vhost("dash." + lib.data.config.domain, dash));
	app.listen(lib.data.config.port, () => { })
} catch (err) {
	throw new lib.errors.SiteError(err.stack)
}