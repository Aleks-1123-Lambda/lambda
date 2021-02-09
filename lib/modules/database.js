let Enmap = require("enmap");
let database = {
	
};
/* Settings */
database.settings = new Enmap({
	name: "settings",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});
database.defaultSettings = {
	prefix: "&",
	modLogChannel: "",
	modRole: "",
	adminRole: "",
	welcomeChannel: "",
	welcomeMessage: "Powitajmy wszyscy {{user}}! Wszyscy potrzebujemy czasami ciepłego przywitania :D",
	welcomeMessageTitle: "Witaj!",
	goodbyeChannel: "",
	goodbyeMessage: "Niestety, ale `{{user.tag}}` nas opuścił :cry:",
	goodbyeMessageTitle: "Żegnaj!",
	broadcastChannel: "",
	roleVerification: "",
	roleVerificationRemove: "",
	autorole: "",
	channelLogsVerify: "",
	channelLogs: "",
	proposalsChannel: "",
	ticketsChannel: "",
	antyinvite: "off",
	antyinviteRole: "",
	antyinviteChannel: "",
	badwords: "off",
	nsfw: "",
	mutedRole: "",
	disabledCommandInfo: "on",
};

/* User Profiles */
database.defaultProfile = {
	name: "Nie podano",
	description: "Nie podano",
	birthday: "Nie podano",
	email: "Nie podano",
	website: "Nie podano",
	discord: "Nie podano",
	instagram: "Nie podano",
	snapchat: "Nie podano",
	twitter: "Nie podano",
	github: "Nie podano",
	badges: "",
	spotify: "Nie podano",
	youtube: ""
};
database.profile = new Enmap({
	name: "profile",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});

/* Cases */
database.guildCase = new Enmap({
	name: "guildCase",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});
database.userCase = new Enmap({
	name: "userCase",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});

database.defaultCase = {
	"cases": "0",
}
database.defaultUserCase = {
	"userWarnings": []
}
/* Gbans */
database.gban = new Enmap({
	name: "gban",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
})
database.defaultGban = {
	status: false,
	reason: null,
	author: null,
	date: null
};
/* Autoresponders */
database.autoresponder = new Enmap({
	name: "autoresponder",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});

database.defaultAutoResponder = {
	"count": 0,
	autoResponders: [],
}

/* User todo */
database.todo = new Enmap({
	name: "todo",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});

database.defaultToDo = {
	"count": 0,
	"todos-count": [],
}
/* Enable/disable Commands */
database.guildCommands = new Enmap({
	name: "guildCommands",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});
database.defaultOffCommands = {

}
/* Server verification */
database.serverVerify = new Enmap({
	name: "serverVerify",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});

database.defaultserverVerify = {
	"id": [],
}
/* Snipe */
database.snipe = new Enmap({
	name: "snipe",
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
})
database.defaultSnipe = {
	nextDelete: 1,
	nextEdit: 1,
	delete: "",
	edit: ""
}
module.exports = database;                                                        		        			  		  		        			  			        													  	  	  	  	  	  	    	        					        			    		        			    		        		    									  	  	  		  	  	  					  	  	  		  	                         	                                                                                                                      			  						                                 			  						                                                                                                                                                                                                                                                                               