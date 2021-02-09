const Discord = module.require("discord.js")
const moment = module.require("moment");
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };

module.exports.run = async (client, guildConf, message) => {
	let antyinviteChannels = guildConf.antyinviteChannels;
	let antyinviteChannelsVisible = "Brak";
	if (antyinviteChannels) antyinviteChannelsVisible = "";
	if (antyinviteChannels) {
		antyinviteChannels.forEach(r => {
			antyinviteChannelsVisible += `<#${r.id}>, `
		});
	}
	let antyinviteRoles = guildConf.antyinviteRoles;
	let antyinviteRolesVisible = "Brak";
	if (antyinviteRoles) antyinviteRolesVisible = "";
	if (antyinviteRoles) {
		antyinviteRoles.forEach(r => {
			antyinviteRolesVisible += `<@&${r.id}>, `
		});
	}
	message.delete();
	const embed = new Discord.MessageEmbed()
		.setTitle("<:icon_follow:705076678296207381> Wysłano zaproszenie")
		.setDescription("Nie posiadasz uprawnień do wysylania zaproszeń.")
		.addField('Kanały do wysyłania zaproszeń:', `${antyinviteChannelsVisible}`)
		.addField('Role które mogą wysyłać zaproszenia:', `${antyinviteRolesVisible}`)
		.setColor("RED")
		.setFooter(`By wyłączyć system antyinvite użyj komendy ${guildConf.prefix}config`)
.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL(ImageURLOptions)}`)



	message.channel.send(embed)
}

module.exports.help = {
	name: "invitePosted"
}