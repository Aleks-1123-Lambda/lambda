const { Player } = require("discord-music-player");

module.exports = async (client) => {
	const player = new Player(client);
	client.music = player;
	
}
