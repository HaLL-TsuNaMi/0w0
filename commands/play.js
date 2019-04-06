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
	var queue = [];
	var queueNames = [];
	var isPlaying = false;
	var dispatcher = null;
	var voiceChannel = null;
	var skipReq = 0;
	var skippers = [];
	const member = msg.member;
	const mess = msg.content.toLowerCase();
	var args = msg.content.split(" ").slice(1).join(" ");

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

	function skipSong(msg) {
		dispatcher.end();
		}
	
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
	}
}

module.exports.help = {
	name: "play"
}