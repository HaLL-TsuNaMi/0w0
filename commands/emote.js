const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
    var voicechannel = msg.member.voiceChannel;

    switch(msg.content) {
		case config.prefix + "emote":
			let emote = ["(◍•ᴗ•◍)❤", "✩◝(◍⌣̎◍)◜✩", "!(•̀ᴗ•́)و ̑̑", "(ง ͡ʘ ͜ʖ ͡ʘ)ง", "╭∩╮(-_-)╭∩╮", "(ಥ⌣ಥ)", "( ͡° ͜ʖ ͡°)", "(。^_・)ノ", "ᕙ༼*◕_◕*༽ᕤ", "└(=^‥^=)┐", "¯\_༼ ಥ ‿ ಥ ༽_/¯", 
			"(′︿‵｡)", "٩(ↀДↀ)۶", "ʕ•͡-•ʔ", "ʕʘ̅͜ʘ̅ʔ", "(✖╭╮✖)", "┌(˘⌣˘)ʃ", "(｡♥‿♥｡)", "꒰⑅•ᴗ•⑅꒱", ];

			msg.reply(emote[Math.floor(Math.random()*emote.length)]);
			console.log(emote[Math.floor(Math.random()*emote.length)]);
		break;
	}
}

module.exports.help = {
    name: "emote"
}