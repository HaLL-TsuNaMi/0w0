const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
	// checks the message for prefix + emote
	switch(msg.content) {
		case config.prefix + "emote":
			// variable with array of faces
			let emote = ["(◍•ᴗ•◍)❤", "✩◝(◍⌣̎◍)◜✩", "!(•̀ᴗ•́)و ̑̑", "(ง ͡ʘ ͜ʖ ͡ʘ)ง", "╭∩╮(-_-)╭∩╮", "(ಥ⌣ಥ)", "( ͡° ͜ʖ ͡°)", "(。^_・)ノ", "ᕙ༼*◕_◕*༽ᕤ", "└(=^‥^=)┐", "¯\_༼ ಥ ‿ ಥ ༽_/¯", 
			"(′︿‵｡)", "٩(ↀДↀ)۶", "ʕ•͡-•ʔ", "ʕʘ̅͜ʘ̅ʔ", "(✖╭╮✖)", "┌(˘⌣˘)ʃ", "(｡♥‿♥｡)", "꒰⑅•ᴗ•⑅꒱", ];

			// math.floor lets it stay in bounds in the array
			// math.random chooses a random integer from the array
			// coin.length makes sure that it takes the whole string and not just a character as the reply
			msg.reply(emote[Math.floor(Math.random()*emote.length)]);
			console.log(emote[Math.floor(Math.random()*emote.length)]);
		break;
	}
}

module.exports.help = {
	name: "emote"
}