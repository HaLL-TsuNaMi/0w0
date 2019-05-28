const Discord = require("discord.js");
const config = require("../config.json");

var queue = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];

module.exports.run = async (bot, msg, args) => {
	switch(msg.content) {
		// Basic 0w0 commands
		case config.prefix + "info":
			msg.reply({embed: {
				color: 0x7FADF8,
				author: {
				name: bot.user.username,
				icon_url: bot.user.displayAvatarURL
			},
				title: "Infowmation about ME! 0w0",
				url: "https://github.com/HaLL-TsuNaMi/0w0",
				description: "I'm bak and bettew than evew, now I can pway youw songs with my new DJ set that I got! UwU",
				timestamp: new Date(),
				footer: {
					icon_url:bot.user.displayAvatarURL,
					text: "Hope you enjoy my new wemix! UwU (0w0 version 2.0)"
				}
			}
		});
			console.log("Infowmation about ME! 0w0");
			break;
		case config.prefix + "help":
			msg.reply("``` *ping, *info, *restart, *shutdown ```");
			console.log("*ping, *info, *restart, *shutdown");
		break;
    }
}

module.exports.help = {
	name: "info"
}