const { Command } = require('discord.js-commando');

module.exports = class EmoteCommand extends Command {
	constructor(client) {
	  super(client, {
		name: 'emote',
		aliases: ['emoticon', 'e'],
		group: 'other',
		memberName: 'emote',
		guildOnly: true,
		description: 'randomly cycles through emotes'
	  });
	}

	run(msg) {
		let emote = ["(◍•ᴗ•◍)❤", "✩◝(◍⌣̎◍)◜✩", "!(•̀ᴗ•́)و ̑̑", "(ง ͡ʘ ͜ʖ ͡ʘ)ง", "╭∩╮(-_-)╭∩╮", "(ಥ⌣ಥ)", "( ͡° ͜ʖ ͡°)", "(。^_・)ノ", "ᕙ༼*◕_◕*༽ᕤ", "└(=^‥^=)┐", "¯\_༼ ಥ ‿ ಥ ༽_/¯", 
		"(′︿‵｡)", "٩(ↀДↀ)۶", "ʕ•͡-•ʔ", "ʕʘ̅͜ʘ̅ʔ", "(✖╭╮✖)", "┌(˘⌣˘)ʃ", "(｡♥‿♥｡)", "꒰⑅•ᴗ•⑅꒱", ];

		// math.floor lets it stay in bounds in the array
		// math.random chooses a random integer from the array
		// coin.length makes sure that it takes the whole string and not just a character as the reply
		msg.reply(emote[Math.floor(Math.random()*emote.length)]);
		console.log(emote[Math.floor(Math.random()*emote.length)]);
	}
};