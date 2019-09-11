const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {

    // function with shutdown command in it
    function restart(channel) {

        // embed msg
        channel.send({embed: {
            color: 0x7FADF8,
            author: {
                name: bot.user.username,
                icon_url: bot.user.displayAvatarURL
            },
                title: "0w0: Restarting...",
                description: "brb everyone just have to clean my dj set >w<",
                timestamp: new Date()
            }
        });

        // puts txt in console then shuts bot down
        console.log("0w0: restarting...");
        bot.destroy();
    }

    // checks msg for prefix + shutdown
    switch(msg.content) {
		case config.prefix + "restart":
            // runs restart command
			restart(msg.channel);
        break;
    }
}

module.exports.help = {
    name: "restart"
}