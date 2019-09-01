const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
	let coin = ["Heads", "Tails"];

	if(msg.content == config.prefix + "coin") {
		msg.reply(coin[Math.floor(Math.random()*coin.length)]);
	}
}

module.exports.help = {
	name: "coin"
}