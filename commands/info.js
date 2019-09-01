const Discord = require("discord.js");
const config = require("../config.json");
const package = require("../package.json");

module.exports.run = async (bot, msg, args) => {

	// checks for prefix + info
	switch(msg.content) {
		// Basic 0w0 commands
		case config.prefix + "info":

			// prints an embeded message to discord
			msg.reply({embed: {
				// color of color bar on left
				color: 0x7FADF8,
				// prints bots name at top of msg with icon
				author: {
				name: bot.user.username,
				icon_url: bot.user.displayAvatarURL
			},
				// big bold txt after user and icon
				title: "Infowmation about ME! 0w0",
				// makes title a link
				url: "https://github.com/HaLL-TsuNaMi/0w0",
				// smaller txt under title
				description: "I'm bak and bettew than evew, now I can pway youw songs with my new DJ set that I got! UwU",
				// puts the date under everything in grey txt
				timestamp: new Date(),
				// in smaller txt it tells the version of 0w0 and smol msg from him
				footer: {
					icon_url:bot.user.displayAvatarURL,
					text: `Hope you enjoy my new wemix! UwU (0w0 version ${package.version})`
				}
			}
		});
			console.log("Infowmation about ME! 0w0");
		break;
    }
}

module.exports.help = {
	name: "info"
}