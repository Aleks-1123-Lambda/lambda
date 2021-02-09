const Discord = require('discord.js');
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };

module.exports.run = async (client, error) => {
	let out = client.channels.cache.get(client.lib.data.channels.errors);
	const embed = new Discord.MessageEmbed()
		.setColor('RED')
		.setTitle('Error')
		.addField(`Error content`, `\`\`\`${error}\`\`\`\``)
	out.send(embed);
}

module.exports.help = {
	name: "error"
}