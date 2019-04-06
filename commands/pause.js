const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const request = require("request");
const opusscript = require("opusscript");
const ytdl = require("ytdl-core");
const fs = require("fs");
const pack = require("../package.json");
const getYoutubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
bot.commands = new Discord.Collection();

module.exports.run = async(bot, msg, args) => {
    var dispatcher = null;

    switch(msg.content) {
        case config.prefix + "pause":
        dispatcher.pause();
		console.log("pause UwU");
	}
}

module.exports.help = {
    name: "pause"
}