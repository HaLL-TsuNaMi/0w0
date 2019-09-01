const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
	switch(msg.content) {
		case config.prefix + "help":
			msg.reply("``` *ping, *info, *restart, *shutdown, *leave, *play, *skip, *queue, *pause, *resume, *clear, *volume, *emote, *coin, *remove, *loop, *np, *search [UwU these are all of the commands] ```");
			console.log("*ping, *info, *restart, *shutdown, *leave, *play, *skip, *queue, *pause, *resume, *clear, *volume, *emote, *coin, *remove, *loop, *np, *search [UwU these are all of the commands]");
		break;
	}
};

module.exports.help = {
	name: "help"
}