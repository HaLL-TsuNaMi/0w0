/* Music bot commands */
function Music() {
    bot.on("message", function(msg, channel, args, queue) {
        switch(msg.content) {
            case config.prefix + "play":
                const ytdl = require('ytdl-core');
                const streamOptions = { seek: 0, volume: 1 };
                const broadcast = bot.createVoiceBroadcast();
                
                //play(connection, msg);
                msg.member.voiceChannel.join().then(connection => {
                    const stream = ytdl('https://youtu.be/UzZGO9hgpBU', { filter : 'audioonly' });
                    broadcast.playStream(stream);
                    const dispatcher = connection.playBroadcast(broadcast);
                })
                .catch(console.error);
                break;
        }
    });
}