// Libraries
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const pack = require("./package.json");
bot.commands = new Discord.Collection();
const nodeOpus = require("node-opus");
const Music = require("discord.js-musicbot-addon");

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

// Music command from discord.js-musicbot-addon library (Basic layout)
Music.start(bot, {
	youtubeKey: config.ytKey,
	botPrefix: config.prefix,
	maxQueueSize: 0,
	anyoneCanSkip: true,
	anyoneCanAdjust: true,
	anyoneCanLeave: true,
	logging: false,
	musicPresence: true,
	clearPresence: true,
	bigPicture: true,
	defVolume: 10,
	help: {
		enabled: false
	}
});

// Reads files and puts code ready to run
bot.on("message", function(msg) {
	let msgArray = msg.content.split(" ");
	let cmd = msgArray[0];
	let args = msgArray.slice(1);
	let commandfile = bot.commands.get(cmd.slice(config.prefix.length));
	if(commandfile) commandfile.run(bot,msg,args);
});

// logs bot into discord and loads all the commands (obviously UwU???? like duh???)
bot.login(config.token);