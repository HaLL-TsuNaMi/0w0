const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const request = require("request");
const opusscript = require("opusscript");
const ytdl = require("ytdl-core");
const pack = require("./package.json");

/* functions for later */
bot.on("ready", function() {
	bot.user.setActivity("with DJ Set");
	console.log("I am weady UwU!");
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

/* Music bot commands */
function play(connection, msg) {
	var server = servers[msg.guild.id];

	server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

	server.queue.shift();

	server.dispatcher.on("end", function() {
		if(server.queue[0]) play(connection, msg);
		else connection.disconnect();
	});
}

bot.on("message", function(msg) {
// Lets 0w0 join a voice channel
if (!msg.guild) return;

if (msg.content === config.prefix + "join") {
	// Only try to join the sender's voice channel if they are in one themselves
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          msg.reply('I joined!!! UwU');
        })
        .catch(console.log);
    } else {
      msg.reply('You gotta join a voice channew fiwst UmU');
    }
  }

// Lets 0w0 leave a voice channel
switch(msg.content) {
	case config.prefix + "leave":
		msg.member.voiceChannel.leave();
		msg.channel.reply("Don't have to be so wude I wiww weave UmU");
		break;
	case config.prefix + "play":
		if(!args[1]) {
			msg.channel.sendMessage("Pweaze pwovide a wink UwU");
			return;
		}

		if(!msg.member.voiceChannel) {
			msg.channel.sendMessage("You must be in a voice channew UmU");
			return;
		}

		if(!servers[msg.guild.id]) servers[msg.guild.id] = {
			queue: []
		}

		var server = servers[msg.guild.id];

		server.queue.push(args[1]);

		if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection) {
			play(connection, msg);
		});
		break;
	case config.prefix + "skip":
		var server = servers[msg.guild.id];

		if(server.dispatcher) server.dispatcher.end();
		break;
	case config.prefix + "stop":
		var server = servers[msg.guild.id];

		if(server.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
		break;
	}
});

bot.login(config.token);