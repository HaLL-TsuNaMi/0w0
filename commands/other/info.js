const Discord = require("discord.js");
const client = new Discord.Client();
const { Command } = require('discord.js-commando');
const pack = require("../../package.json");
//const config = require("../../config.json");

module.exports = class InfoCommand extends Command {
	constructor(client) {
	  super(client, {
		name: 'info',
		aliases: ['information', 'i'],
		group: 'other',
		memberName: 'info',
		guildOnly: true,
		description: 'says some information about 0w0 like what version he is on and such UwU'
	  });
	}

	run(msg) {
		// checks for prefix + info

		// prints an embeded message to discord
		msg.reply({embed: {
			// color of color bar on left
			color: 0x7FADF8,
			// big bold txt after user and icon
			title: "Infowmation about ME! 0w0",
			// makes title a link
			url: "https://github.com/HaLL-TsuNaMi/0w0",
			// smaller txt under title
			description: "I'm bak and bettew than evew, now I can pway youw songs with my new DJ set that I got! UwU",
			// puts the date under everything in grey txt
			timestamp: new Date(),
			// in smaller txt it tells the version of 0w0 and smol msg from him
			footer: {
				text: `Hope you enjoy my new wemix! UwU (0w0 version ${pack.version})`
			}
		}
	});
		console.log("Infowmation about ME! 0w0");
	}
};