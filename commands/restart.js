const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {

	// simple function with embed msg and extra
	function resetBot(channel) {
		channel.send({embed: {
			color: 0x7FADF8,
			author: {
				name: bot.user.username,
				icon_url: bot.user.displayAvatarURL
			},
				title: "Restarting 0w0...",
				description: "I wiww be wight bak evewyone >w<!",
				timestamp: new Date()
		}});

		// shuts down the bot and turns him back on
		bot.destroy();
		bot.login(config.token);
	}

	// checks msg for prefix + restart
	switch(msg.content) {
		case config.prefix + "restart":

			// puts txt in console and runs the restart function
			console.log("0w0: Restarting...");
			voicechannel.leave();
			resetBot(msg.channel);
		break;
	}
}

module.exports.help = {
	name: "restart"
}