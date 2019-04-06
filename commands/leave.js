const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
    var voicechannel = msg.member.voiceChannel;

    switch(msg.content) {
        //Summon and leave command for 0w0
    case config.prefix + "leave":
        console.log("Don't have to be so wude I wiww weave UmU");
        queue = [];
        voicechannel.leave();
        msg.reply("Don't have to be so wude I wiww weave UmU");
    break;
    }
}

module.exports.help = {
    name: "leave"
}