const Discord = require("discord.js")
const db = require("quick.db")
const parsems = require("parse-ms")
const ImageURLOptions = { format: "png", dynamic: true, size: 1024 };
const ms = require("ms")
module.exports = async (client) => {
	client.cooldowns = class Cooldowns {
		constructor() {};
		/**
		 * Checking a cooldown
		 * @param {object} message - Message Object
		 * @param {string} time - Time (ex. 19d)
		 * @param {string} key - Cooldown key
		 * @param {boolean} global - Global Cooldown boolean
		 * @param {boolean} programmerBypass - Programmer Bypass Boolean
		 */
		check(message, time, key, global = true, programmerBypass = true) {
			if (!message || !time || !key) return false
			try {
				if (programmerBypass && message.author.permissionLevel == 5) return false;
				let tm;
				if (global == true) {
					tm = db.fetch(`cooldown_${key}_${message.author.id}`);
				} else {
					tm = db.fetch(`cooldown_${key}_${message.author.id}_${message.guild.id}`);
				}
				let timeout = ms(time);
				if (!timeout) return "Err: Provided an invalid time!"
				if (tm !== null && timeout - (Date.now() - tm) > 0) {
					let time = parsems(timeout - (Date.now() - tm));
					//client.lib.embeds().error(message, `Poczekaj jeszcze \`${time.hours}h ${time.minutes}m ${time.seconds}s\``)
					if (global) {
						db.set(`cooldown_${key}_${message.author.id}`, Date.now())
					} else {
						db.set(`cooldown_${key}k_${message.author.id}_${message.guild.id}`, Date.now())
					}
					return time;
				} else return false;
			} catch (err) {
				return err
			}
		}
		/**
		 * Settings cooldown
		 * @param {object} message - Message Object
		 * @param {string} key - Cooldown Key
		 * @param {boolean} global - Global Boolean
		 */
		set(message, key, global = true) {
			if (!message || !key) return false

			try {
				if (global) {
					db.set(`cooldown_${key}_${message.author.id}`, Date.now()); return true
				} else db.set(`cooldown_${key}_${message.author.id}_${message.guild.id}`, Date.now()); return true
			} catch (err) {
				return false
			}
		}
	}
}