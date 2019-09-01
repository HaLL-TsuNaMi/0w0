const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
	// variable with 2 item array
	let coin = ["Heads", "Tails"];

	// checks if the msg has prefix + coin then runs code
	if(msg.content == config.prefix + "coin") {
		// math.floor lets it stay in bounds in the array
		// math.random chooses a random integer from the array
		// coin.length makes sure that it takes the whole string and not just a character as the reply
		msg.reply(coin[Math.floor(Math.random()*coin.length)]);
	}
}

module.exports.help = {
	name: "coin"
}