const Discord = require("discord.js")

/**
 * Replace All function
 * @param {string} string - String to replace
 * @param {string} search - String to search
 * @param {string} replacement - String to replace a search
 * @returns {string} - Replaced string
 */
function replaceAll(string, search, replacement) {
	return string.split(search).join(replacement);
}
/**
 * GetUserFromMention function
 * @param {string} mention - Mention string
 * @param {object} opts - Client or Message Object
 */
function getUserFromMention(mention, opts) {
	if (!mention || !mention.includes("<@")) return null;
	if (opts instanceof Discord.Message) {
		mention = mention.replace(/^\D+/g, '');
		if (mention.endsWith('>')) mention = mention.slice(0, -1);
		//opts.guild.members.fetch(mention).catch(false)
		try {
			return opts.guild.members.cache.get(mention) || null;
		} catch {
			return null
		}
	} else if (opts instanceof Discord.Client) {
		mention = mention.replace(/^\D+/g, '');
		if (mention.endsWith('>')) mention = mention.slice(0, -1);
		//opts.users.fetch(mention).catch(false)
		try {
			return opts.users.cache.get(mention) || null;
		} catch {
			return null;
		}
	} else throw new TypeError("Opts must be a message or client!")
}
/**
 * getUser function
 * @param {object} member - GuildMember or User
 * @returns {object} - User
 */
function getUser(member) {
	if (!member) return null;
	if (member instanceof Discord.GuildMember) {
		return member.user;
	} else if (member instanceof Discord.User) {
		return member
	} else throw new TypeError("Member must be a user or guildMember!");
}
/**
 * Resolve bool function
 * @param {string} lang - Langulange output boolean
 * @param {string} way  - Way to resolbe
 * @param {boolean} bool - Boolean to resolve
 * @returns {string} - Resolved Boolean
 */
function resolveBool(lang, way, bool) {
	if(lang.toLowerCase() == 'pl') {
		if(way.toLowerCase() == 'yesno') {
			if(bool) return 'Tak';
			else return 'Nie';
		} else if(way.toLowerCase() == 'truefalse') {
			if(bool) return 'Prawda';
			else return 'Fałsz';
		}
	} else if (lang.toLowerCase() == 'en') {
		if(way.toLowerCase() == 'yesno') {
			if(bool) return 'Yes';
			else return 'No';
		} else if(way.toLowerCase() == 'truefalse') {
			if(bool) return 'True';
			else return 'False';
		}
	}
}
module.exports = {
	replaceAll,
	getUserFromMention,
	getUser,
	resolveBool
}
