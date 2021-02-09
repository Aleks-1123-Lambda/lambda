const Discord = module.require("discord.js")
const moment = module.require("moment");
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };

module.exports.run = async (client, guildConf, message) => {
	let antylinkChannels = guildConf.antylinkChannels;
	let antylinkChannelsVisible = "Brak";
	if (antylinkChannels) antylinkChannelsVisible = "";
	if (antylinkChannels) {
		antylinkChannels.forEach(r => {
			antylinkChannelsVisible += `<#${r.id}>, `
		});
	}
	let antylinkRoles = guildConf.antylinkRoles;
	let antylinkRolesVisible = "Brak";
	if (antylinkRoles) antylinkRolesVisible = "";
	if (antylinkRoles) {
		antylinkRoles.forEach(r => {
			antylinkRolesVisible += `<@&${r.id}>, `
		});
	}
	message.delete();
	const embed = new Discord.MessageEmbed()
		.setTitle("<:icon_follow:705076678296207381> Wysłano link")
		.setDescription("Nie posiadasz uprawnień do wysyłania linków.")
		.addField('Kanały na których można wysyłać linki:', `${antylinkChannelsVisible}`)
		.addField('Role które mogą wysyłać linki:', `${antylinkRolesVisible}`)
		.setColor("RED")
		.setFooter(`By wyłączyć system antylink użyj komendy ${guildConf.prefix}config`)
.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)



	message.channel.send(embed)
}

module.exports.help = {
	name: "linkPosted"
}