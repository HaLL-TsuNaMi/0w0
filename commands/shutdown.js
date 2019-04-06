const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
    var voicechannel = msg.member.voiceChannel;

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

    switch(msg.content) {
		case config.prefix + "shutdown":
			console.log("0w0: Shuttingdown...");
			shutdown(msg.channel);
        break;
    }
}

module.exports.help = {
    name: "shutdown"
}