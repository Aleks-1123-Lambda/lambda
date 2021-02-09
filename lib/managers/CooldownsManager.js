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
		 * @param {string} time - Time string (10d)
		 * @param {string} key - Cooldown key
		 * @param {booleam} global - Global cooldown boolean
		 * @param {boolean} programmerBypass - Programmer bypass boolean
		 */
		check(message, time, key, global = true, programmerBypass = true) {
			if (!message || !time || !key) return false
			try {
				if (programmerBypass && message.author.permissionLevel == 5) return false;
				let tm;
				if (global) {
					tm = db.fetch(`cooldown_${key}_${message.author.id}`);
				} else {
					tm = db.fetch(`cooldown_${key}_${message.author.id}_${message.guild.id}`);
				}
				let timeout = ms(time);
				if (!timeout) return "Err: Provided an invalid time!"
				if (tm && timeout - (Date.now() - tm) > 0) {
					let time = parsems(timeout - (Date.now() - tm));
					if (global) {
						db.set(`cooldown_${key}_${message.author.id}`, Date.now())
					} else {
						db.set(`cooldown_${key}_${message.author.id}_${message.guild.id}`, Date.now())
					}
					return time;
				} else return false;
			} catch (err) {
				return err
			}
		}
		/**
		 * Setting a cooldown
		 * @param {object} message - Message Object
		 * @param {string} key  - Cooldown key
		 * @param {boolean} global - GLobal cooldown boolean
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