const { Command } = require('discord.js-commando');

module.exports = class CoinCommand extends Command {
	constructor(client) {
	  super(client, {
		name: 'coin',
		aliases: ['flip'],
		group: 'other',
		memberName: 'coin',
		guildOnly: true,
		description: 'Flips a coin randomly getting heads or tails'
	  });
	}

	run(msg) {
		// variable with 2 item array
		let coin = ["Heads", "Tails"];

		// checks if the msg has prefix + coin then runs code
		// math.floor lets it stay in bounds in the array
		// math.random chooses a random integer from the array
		// coin.length makes sure that it takes the whole string and not just a character as the reply
		msg.reply(coin[Math.floor(Math.random()*coin.length)]);
	}
};