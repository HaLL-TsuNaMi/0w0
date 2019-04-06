// Libraries
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
bot.commands = new Discord.Collection();

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

function skipSong(msg) {
	dispatcher.end();
}

function playMusic(id, msg, args) {
	voiceChannel = msg.member.voiceChannel;
	voiceChannel.join().then(function(connection) {
		stream = ytdl("https://www.youtube.com/watch?v=" + id, { filter: "audioonly"});
		skipReq = 0;
		skippers = [];

		dispatcher = connection.playStream(stream);
		dispatcher.setVolume(2/10);
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

// Reads files then logs them in the terminal
fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);

	let jsFile = files.filter(f => f.split(".").pop() == "js");

	if(jsFile.length <= 0) {
		console.log("I couwdn't find fiwes im sowwy UmU");
		return;
	}

	jsFile.forEach ((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} woaded UwU!`);
		bot.commands.set(props.help.name, props);
	});

});

// Logs warnings
bot.on("warn", console.warn);

// Logs errrors
bot.on("error", console.error);

// Logs when everything is ready to go
bot.on("ready", function() {
	bot.user.setActivity("with DJ Set");
	console.log("I am weady UwU!");
});

// Logs when disconnected from voicechannel
bot.on("disconnect", () => console.log("I just disconnected UwU"));

// Reads files and puts code ready to run
bot.on("message", function(msg) {
	/*var voicechannel = msg.member.voiceChannel;*/
	let msgArray = msg.content.split(" ");
	let cmd = msgArray[0];
	let args = msgArray.slice(1);
	let commandfile = bot.commands.get(cmd.slice(config.prefix.length));
	if(commandfile) commandfile.run(bot,msg,args);
});

// Music bot commands 0w0
bot.on("message", function(msg, args) {
	const member = msg.member;
	const mess = msg.content.toLowerCase();
	var args = msg.content.split(" ").slice(1).join(" ");
	
	if (mess.startsWith(config.prefix + "play"))  {
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
						console.log(" Now pwaying UwU: **" + videoInfo.title + "**");
					});
				});
		}
	} else {
		msg.reply(" You need to be in voice channew UmU!!!");
	}
	} else if (mess.startsWith(config.prefix + "skip")) {
		skipSong(msg);
		msg.reply(" Youw skip was acknowedged UwU!!!");
		console.log(" Youw skip was acknowedged UwU!!!");
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
		console.log("msg2 += temp");
	} else if (mess.startsWith(config.prefix + "pause")) {
		dispatcher.pause();
		console.log("pause UwU");
	} else if (mess.startsWith(config.prefix + "resume")) {
		dispatcher.resume();
		console.log("resumed youwe music UwU");
	} else if (mess.startsWith(config.prefix + "stop")) {
		if(!msg.member.voiceChannel) return msg.reply("Youwe not in voice channew UmU");
		queue = [];
		dispatcher.end();
		console.log("done stopped all the music UwU");
	} else if (mess.startsWith(config.prefix + "volume")) {
		if (!msg.member.voiceChannel) return msg.channel.send('Youw not in a voice channew UmU');
		if (!dispatcher) return msg.channel.send('thewe is nothing pwaying UwU');
		if (!args[0]) return msg.channel.send(`Cuwwent vowume is UwU!!!: **${dispatcher.volume}**`);
		dispatcher.volume = args[0];
		dispatcher.setVolume(args[0]/10);
		console.log(`Vowume set to UwU: **${dispatcher.volume}**`);
		return msg.channel.send(`Vowume set to UwU: **${dispatcher.volume}**`);
	}
});

bot.login(config.token);