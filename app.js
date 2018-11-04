const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const request = require("request");
const opusscript = require("opusscript");
const ytdl = require("ytdl-core");
const fs = require("fs");
const pack = require("./package.json");

/* functions for later */
bot.on("ready", function() {
	bot.user.setActivity("with DJ Set");
	console.log("I am weady UwU!");
	console.log(`[Start] ${new Date()}`);
});

/* basic commands for 0w0 */
bot.on("message", function(msg) {
	if (msg.content === config.prefix + "ping") {
		msg.reply({embed: {
			color: 0x7FADF8,
			author: {
				name: bot.user.username,
				icon_url: bot.user.displayAvatarURL
			},
				title: "pong UwU",
				timestamp: new Date()
		}});
	} else if (msg.content === config.prefix + "info") {
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
	} else if (msg.content === config.prefix + "commands") {
		msg.reply({embed: {
			color: 0x7FADF8,
			author: {
				name: bot.user.username,
				icon_url: bot.user.displayAvatarURL
			},
				title: "ping, info, shutdown, and the command you just used UwU",
				timestamp: new Date()
		}});
	}

// Lets 0w0 leave a voice channel
switch(msg.content) {
	case config.prefix + "leave":
		msg.member.voiceChannel.leave();
		msg.reply("Don't have to be so wude I wiww weave UmU");
		break;
	case config.prefix + "summon":
		msg.member.voiceChannel.join();
		msg.reply("I've been summoned!!! UwU");
		break;
	}
});

/* Music bot commands */
function play(connection, msg) {
// Play streams using ytdl-core
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const broadcast = client.createVoiceBroadcast();

voiceChannel.join()
  .then(connection => {
    const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter : 'audioonly' });
    broadcast.playStream(stream);
    const dispatcher = connection.playBroadcast(broadcast);
  })
  .catch(console.error);

  switch(msg.content) {
	case config.prefix + "play":
		broadcast.playStream("https://www.youtube.com/watch?v=U06jlgpMtQs");
		break;
  }
}

bot.on("message", function(msg, channel) {
	switch(msg.content) {
		case config.prefix + "play":
			const ytdl = require('ytdl-core');
			const streamOptions = { seek: 0, volume: 1 };
			const broadcast = bot.createVoiceBroadcast();

			msg.member.voiceChannel.join()
			.then(connection => {
				const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', { filter : 'audioonly' });
				broadcast.playStream(stream);
				const dispatcher = connection.playBroadcast(broadcast);
			})
			.catch(console.error);
			break;
	}
});

/* Shut down and restart commands UwU */
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

bot.on("message", function(msg) {
	switch(msg.content) {
		case config.prefix + "restart":
			resetBot(msg.channel);
			break;
		case config.prefix + "shutdown":
			shutdown(msg.channel);
			break;
	}
});

bot.login(config.token);