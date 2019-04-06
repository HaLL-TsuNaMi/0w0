const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
    var voicechannel = msg.member.voiceChannel;

    switch(msg.content) {
		case config.prefix + "summon":
			console.log("I've been summoned!!! UwU");
			if(msg.member.voiceChannel) {
				if(!msg.guild.voiceConnection) {
					voicechannel.join()
						.then(connection => {
							msg.reply("I've been summoned!!! UwU");
						});
				}
			} else {
				msg.reply("You must be in a voice channew UmU!!!");
			}
        break;
    }
}

module.exports.help = {
    name: "summon"
}