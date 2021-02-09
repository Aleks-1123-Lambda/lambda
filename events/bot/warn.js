const Discord = require('discord.js');
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };

module.exports.run = async (client, warn) => {
	let out = client.channels.cache.get(client.lib.data.channels.errors);
	const embed = new Discord.MessageEmbed()
		.setColor('YELLOW')
		.setTitle('Warn')
		.addField(`Warn content`, `${warn}`)
	// .setAuthor(`${oldMessage.author.tag}`, `${oldMessage.author.displayAvatarURL(ImageURLOptions)}`);
	out.send(embed);
}

module.exports.help = {
	name: "warn"
}