const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {

    // function with shutdown command in it
    function shutdown(channel) {

        // embed msg
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

        // puts txt in console then shuts bot down
        console.log("0w0: Shuttingdown...");
        bot.destroy();
    }

    // checks msg for prefix + shutdown
    switch(msg.content) {
		case config.prefix + "shutdown":
            // runs shutdown command
			shutdown(msg.channel);
        break;
    }
}

module.exports.help = {
    name: "shutdown"
}