// Lets 0w0 leave a voice channel
function Summon() {
    bot.on("message", function(msg) {
        switch(msg.content) {
            case config.prefix + "leave":
                msg.member.voiceChannel.leave();
                msg.reply("Don't have to be so wude I wiww weave UmU");
                break;
            case config.prefix + "summon":
                msg.member.voiceChannel.join();
                msg.reply("I've been summoned!!! UwU");
                break;
            }
    });
}