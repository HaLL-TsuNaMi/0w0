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