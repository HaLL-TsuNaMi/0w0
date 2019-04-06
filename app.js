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

bot.on("warn", console.warn);

bot.on("error", console.error);

bot.on("ready", function() {
	bot.user.setActivity("with DJ Set");
	console.log("I am weady UwU!");
});

bot.on("disconnect", () => console.log("I just disconnected UwU"));

bot.on("message", function(msg) {
	var voicechannel = msg.member.voiceChannel;
	let msgArray = msg.content.split(" ");
	let cmd = msgArray[0];
	let args = msgArray.slice(1);
	let commandfile = bot.commands.get(cmd.slice(config.prefix.length));
	if(commandfile) commandfile.run(bot,msg,args);
	});

// Music bot commands 0w0
bot.on("message", function(msg, args) {
	var queue = [];
	var queueNames = [];
	var isPlaying = false;
	var dispatcher = null;
	var voiceChannel = null;
	var skipReq = 0;
	var skippers = [];
	const member = msg.member;
	const mess = msg.content.toLowerCase();
	
	if (mess.startsWith(config.prefix + "queue")) {
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