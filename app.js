const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const request = require("request");
const opusscript = require("opusscript");
const ytdl = require("ytdl-core");
const fs = require("fs");
const pack = require("./package.json");

function resetBot(channel) {
	channel.send({embed: {
		color: 0x7FADF8,
		author: {
			name: bot.user.username,
			icon_url: bot.user.displayAvatarURL
		},
			title: "Restarting 0w0...",
			description: "I wiww be wight bak evewyone >w<!",
			timestamp: new Date()
	}});
	bot.destroy();
	bot.login(config.token);
}

function shutdown(channel) {
	channel.send({embed: {
		color: 0x7FADF8,
		author: {
			name: bot.user.username,
			icon_url: bot.user.displayAvatarURL
		},
			title: "Good Bye Message UwU",
			description: "I'm gonna take a nap!!! Good baii evewyone I wiww miss y'aww UwU",
			timestamp: new Date()
		}
	});
	console.log("Good Baii!!! UwU");
	bot.destroy();
}

bot.on("ready", function() {
	bot.user.setActivity("with DJ Set");
	console.log("I am weady UwU!");
});

bot.on("message", async function(msg, args, ops) {
	switch(msg.content) {
		// Basic 0w0 commands
		case config.prefix + "ping":
			msg.reply({embed: {
				color: 0x7FADF8,
				author: {
					name: bot.user.username,
					icon_url: bot.user.displayAvatarURL
				},
					title: "pong UwU",
					timestamp: new Date()
			}});
			break;
		case config.prefix + "info":
			msg.reply({embed: {
				color: 0x7FADF8,
				author: {
				name: bot.user.username,
				icon_url: bot.user.displayAvatarURL
			},
				title: "Infowmation about ME! 0w0",
				url: "https://github.com/HaLL-TsuNaMi/0w0",
				description: "I'm bak and bettew than evew, now I can pway youw songs with my new DJ set that I got! UwU",
				timestamp: new Date(),
				footer: {
					icon_url:bot.user.displayAvatarURL,
					text: "Hope you enjoy my new wemix! UwU"
				}
			}
		});
			break;
		case config.prefix + "commands":
			msg.reply({embed: {
				color: 0x7FADF8,
				author: {
					name: bot.user.username,
					icon_url: bot.user.displayAvatarURL
				},
					title: "ping, info, shutdown, and the command you just used UwU",
					timestamp: new Date()
			}});
			break;
			//Power commands for 0w0 (Shutdown and Restart)
			case config.prefix + "restart":
				resetBot(msg.channel);
				break;
			case config.prefix + "shutdown":
				shutdown(msg.channel);
				break;
			//Summon and leave command for 0w0
			case config.prefix + "leave":
                msg.member.voiceChannel.leave();
                msg.reply("Don't have to be so wude I wiww weave UmU");
                break;
            case config.prefix + "summon":
                msg.member.voiceChannel.join();
                msg.reply("I've been summoned!!! UwU");
				break;
			//Music commands for 0w0
			case config.prefix + "play":
                const ytdl = require('ytdl-core');
                const streamOptions = { seek: 0, volume: 1 };
                const broadcast = bot.createVoiceBroadcast();
                
                //play(connection, msg);
                msg.member.voiceChannel.join().then(connection => {
                    const stream = ytdl('https://youtu.be/UzZGO9hgpBU', { filter : 'audioonly' });
                    broadcast.playStream(stream);
                    const dispatcher = connection.playBroadcast(broadcast);
                })
                .catch(console.error);
				break;
			}
		}
);
	


bot.login(config.token);