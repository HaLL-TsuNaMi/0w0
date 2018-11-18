const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const request = require("request");
const opusscript = require("opusscript");
const ytdl = require("ytdl-core");
const fs = require("fs");
const pack = require("./package.json");
const getYoutubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

var queue = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];

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

function getID(str, cb) {
	if(isYoutube(str)) {
		cb(getYoutubeID(str));
	} else {
		search_video(str, function(id) {
			cb(id);
		});
	}
}

function add_to_queue(strID) {
	if(isYoutube(strID)) {
		queue.push(getYoutubeID(strID));
	} else {
		queue.push(strID);
	}
}

function search_video(query, callback) {
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + config.ytKey, function(error, response, body) {
		var json = JSON.parse(body);
		if (!json.items[0]) callback("3_-a9nVZYjk");
		else {
			callback(json.items[0].id.videoId);
		}
	});
}

function isYoutube(str) {
	return str.toLowerCase().indexOf("youtube.com") > -1;
}

function skipSong (msg) {
	dispatcher.end();
}

function playMusic(id, msg) {
	voiceChannel = msg.member.voiceChannel;
	voiceChannel.join().then(function(connection) {
		stream = ytdl("https://www.youtube.com/watch?v=" + id, { filter: "audioonly"});
		skipReq = 0;
		skippers = [];

		dispatcher = connection.playStream(stream);
		dispatcher.on("end", function() {
			skipReq = 0;
			skippers = [];
			queue.shift();
			queueNames.shift();
			if(queue.length === 0) {
				queue = [];
				queueNames = [];
				isPlaying = false;
			} else {
				setTimeout(function() {
					playMusic(queue[0], msg);
				}, 500);
			}
		});
	});
}

bot.on("ready", function() {
	bot.user.setActivity("with DJ Set");
	console.log("I am weady UwU!");
});

bot.on("message", function(msg) {
	var voicechannel = msg.member.voiceChannel;

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
					text: "Hope you enjoy my new wemix! UwU (0w0 version 1.0)"
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
			voicechannel.leave();
			msg.reply("Don't have to be so wude I wiww weave UmU");
		break;
		case config.prefix + "summon":
			if(msg.member.voiceChannel) {
				if(!msg.guild.voiceConnection) {
					voicechannel.join()
						.then(connection => {
							msg.reply("I've been summoned!!! UwU");
						});
				}
			} else {
				msg.reply("You must be in a voice channew UmU!!!");
			}
		break;
		}
	});

// Music bot commands 0w0
bot.on("message", function(msg, args) {
	const member = msg.member;
	const mess = msg.content.toLowerCase();
	var args = msg.content.split(" ").slice(1).join(" ");

	if(mess.startsWith(config.prefix + "play"))  {
		if(msg.member.voiceChannel || voiceChannel != null) {
			if(queue.length > 0 || isPlaying) {
				getID(args, function(id) {
					add_to_queue(id);
					fetchVideoInfo(id, function(err, videoInfo) {
						if(err) throw new Error(err);
						msg.reply(" Added to queue UwU: **" + videoInfo.title + "**");
						queueNames.push(videoInfo.title);
					});
				});
			} else {
				isPlaying = true;
				getID(args, function(id) {
					queue.push("id");
					playMusic(id, msg);
					fetchVideoInfo(id, function(err, videoInfo) {
						if(err) throw new Error(err);
						queueNames.push(videoInfo.title);
						msg.reply(" Now pwaying UwU: **" + videoInfo.title + "**");
					});
				});
		}
	} else {
		msg.reply(" You need to be in voice channew UmU!!!");
	}
	} else if (mess.startsWith(config.prefix + "skip")) {
		skipSong(msg);
		msg.reply(" Youw skip was acknowedged UwU!!!");
	} else if (mess.startsWith(config.prefix + "queue")) {
		var msg2 = "```";
		for (var i = 0; i < queueNames.length; i++) {
			var temp = (i + 1) + ": " + queueNames[i] + (i === 0 ? " **(Current Song)**" : "") + "\n";
			if((msg2 + temp).length <= 2000 - 3) {
				msg2 += temp;
			} else {
				msg2 += "```"
				msg.channel.send(msg2);
				msg2 = "```";
			}
		}
		msg2 += "```";
		msg.channel.send(msg2);
	}
});

bot.login(config.token);