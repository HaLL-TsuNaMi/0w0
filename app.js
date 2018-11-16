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
			if(queue.length === 0) {
				queue = [];
				isPlaying = false;
			} else {
				playMusic(queue[0], msg);
			}
		});
	});
}

bot.on("ready", function() {
	bot.user.setActivity("with DJ Set");
	console.log("I am weady UwU!");
	if(isPlaying === true) {
		bot.user.setActivity(videoInfo.title);
	}
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
			// Old music command i need to test out again
			/*case config.prefix + "play":
				const ytdl = require('ytdl-core');
				const streamOptions = { seek: 0, volume: 1 };
				const broadcast = bot.createVoiceBroadcast();
				if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
				const args = msg.content.slice(config.prefix.length).split(' ');
				const command = args.shift().toLowerCase();
					
				//play(connection, msg);
				voiceChannel.join().then(connection => {
					const stream = ytdl(args[0], { filter : 'audioonly' });
					broadcast.playStream(stream);
					const dispatcher = connection.playBroadcast(broadcast);
            	})
            	.catch(console.error);
				break;*/
			// Do not use this play command above

			case config.prefix + "play": 

				break;
			case config.prefix + "skip":

				break;
			}
		}
);

// Music bot commands 0w0
bot.on("message", function(msg, args) {
	const member = msg.member;
	const mess = msg.content.toLowerCase();
	var args = msg.content.split(" ").slice(1).join(" ");

	if(mess.startsWith(config.prefix + "play"))  {
		if(member.voiceChannel || bot.guilds.get("409417571574480896").voiceConnection != null) {
			if(queue.length > 0 || isPlaying) {
				getID(args, function(id) {
					add_to_queue(id);
					fetchVideoInfo(id, function(err, videoInfo) {
						if(err) throw new Error(err);
						msg.reply(" Added to queue UwU: **" + videoInfo.title + "**");
					});
				});
			} else {
				isPlaying = true;
				getID(args, function(id) {
					queue.push("placeholder");
					playMusic(id, msg);
					fetchVideoInfo(id, function(err, videoInfo) {
						if(err) throw new Error(err);
						msg.reply(" Now pwaying UwU: **" + videoInfo.title + "**");
					});
				});
		}
	} else {
		msg.reply(" You need to be in voice channew UmU!!!");
	}
	} else if (mess.startsWith(config.prefix + "skip")) {
		if(skippers.indexOf(msg.author.id) === -1) {
			skippers.push(msg.author.id);
			skipReq++;
			if(skipReq >= Math.ceil((voiceChannel.members.size - 1) / 2)) {
				skipSong(msg);
				msg.reply(" Youw skip was acknowedged UwU!!!");
			} else {
				msg.reply(" You need **" + Math.ceil((voiceChannel.members.size - 1) / 2) - skipReq) + "** mowe skip votes UmU";
			}
		} else {
			msg.reply(" You aweady voted to skip!!! UwU");
		}
	}
});

bot.login(config.token);