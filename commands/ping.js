const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
	switch(msg.content) {
		// Basic 0w0 commands
		case config.prefix + "ping":
			msg.reply({embed: {
				color: 0x7FADF8,
				author: {
					name: bot.user.username,
					icon_url: bot.user.displayAvatarURL
				},
					title: "pong UwU",
					timestamp: new Date()
			}});
			console.log("pong UwU");
		break;
	}
}

module.exports.help = {
	name: "ping"
}