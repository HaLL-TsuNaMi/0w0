const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
	var voicechannel = msg.member.voiceChannel;

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
		bot.destroy();
		bot.login(config.token);
	}

	switch(msg.content) {
		case config.prefix + "restart":
			console.log("0w0: Restarting...");
			voicechannel.leave();
			resetBot(msg.channel);
		break;
	}
}

module.exports.help = {
	name: "restart"
}