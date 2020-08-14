const Discord = require("discord.js");
const client = new Discord.Client();
const { Command } = require('discord.js-commando');

module.exports = class RestartCommand extends Command {
	constructor(client) {
	  super(client, {
		name: 'restart',
		aliases: ['reboot', 'res'],
		group: 'other',
		memberName: 'restart',
		guildOnly: true,
		description: 'restarts 0w0 just in case any bugs happen'
	  });
	}

	run(msg) {
		// function with shutdown command in it
		function restart(channel) {

			// embed msg
			channel.send({embed: {
				color: 0x7FADF8,
				title: "0w0: Restarting...",
				description: "brb everyone just have to clean my dj set >w<",
					timestamp: new Date()
			}
		});
			// puts txt in console then shuts bot down
			console.log("0w0: restarting...");
			client.destroy();
		}

		// checks msg for prefix + shutdown
				// runs restart command
				restart(msg.channel);
	}
};