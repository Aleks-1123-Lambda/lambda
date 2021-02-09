const { GiveawaysManager } = require("discord-giveaways")
const lib = require("../../lib");
const db = lib.modules.db;

module.exports = async (client) => {
/* Creating database */
if (!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

	async getAllGiveaways() {
		return db.get("giveaways");
	}

	async saveGiveaway(messageID, giveawayData) {
		db.push("giveaways", giveawayData);
		return true;
	}

	async editGiveaway(messageID, giveawayData) {
		const giveaways = db.get("giveaways");
		const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
		newGiveawaysArray.push(giveawayData);
		db.set("giveaways", newGiveawaysArray);
		return true;
	}


	async deleteGiveaway(messageID) {
		const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
		db.set("giveaways", newGiveawaysArray);
		return true;
	}

};
const giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
	storage: false,
	updateCountdownEvery: 10000,
	default: {
		botsCanWin: false,
		exemptPermissions: [],
		embedColor: "#FF0000",
		embedColorEnd: "#FF0000",
		reaction: "703137383398244384"
	}
});
lib.giveawaysManager = giveawaysManager;
}
	
