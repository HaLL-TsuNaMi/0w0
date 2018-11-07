/* basic commands for 0w0 */

    /*bot.on("message", function(msg) {
        if (msg.content === config.prefix + "ping") {
            msg.reply({embed: {
                color: 0x7FADF8,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.displayAvatarURL
                },
                    title: "pong UwU",
                    timestamp: new Date()
            }});
        } else if (msg.content === config.prefix + "info") {
            msg.reply({embed: {
                color: 0x7FADF8,
                author: {
                name: bot.user.username,
                icon_url: bot.user.displayAvatarURL
            },
                title: "Infowmation about ME! 0w0",
                url: "https://github.com/HaLL-TsuNaMi/0w0",
                description: "I'm bak and bettew than evew, now I can pway youw songs with my new DJ set that I got! UwU",
                timestamp: new Date(),
                footer: {
                    icon_url:bot.user.displayAvatarURL,
                    text: "Hope you enjoy my new wemix! UwU"
                }
            }
        });
        } else if (msg.content === config.prefix + "commands") {
            msg.reply({embed: {
                color: 0x7FADF8,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.displayAvatarURL
                },
                    title: "ping, info, shutdown, and the command you just used UwU",
                    timestamp: new Date()
            }});
        }
    });

switch(msg.content) {
    case config.prefix + "ping":
        msg.reply({embed: {
            color: 0x7FADF8,
            author: {
                name: bot.user.username,
                icon_url: bot.user.displayAvatarURL
            },
                title: "pong UwU",
                timestamp: new Date()
        }});
        break;
    case config.prefix + "info":
        msg.reply({embed: {
            color: 0x7FADF8,
            author: {
            name: bot.user.username,
            icon_url: bot.user.displayAvatarURL
        },
            title: "Infowmation about ME! 0w0",
            url: "https://github.com/HaLL-TsuNaMi/0w0",
            description: "I'm bak and bettew than evew, now I can pway youw songs with my new DJ set that I got! UwU",
            timestamp: new Date(),
            footer: {
                icon_url:bot.user.displayAvatarURL,
                text: "Hope you enjoy my new wemix! UwU"
            }
        }
    });
        break;
    case config.prefix + "commands":
        msg.reply({embed: {
            color: 0x7FADF8,
            author: {
                name: bot.user.username,
                icon_url: bot.user.displayAvatarURL
            },
                title: "ping, info, shutdown, and the command you just used UwU",
                timestamp: new Date()
        }});
        break;
    }*/

function Basic() {
    bot.on("message", function() {
        switch(msg.content) {
            case config.prefix + "ping":
                msg.reply({embed: {
                    color: 0x7FADF8,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.displayAvatarURL
                    },
                        title: "pong UwU",
                        timestamp: new Date()
                }});
                break;
            case config.prefix + "info":
                msg.reply({embed: {
                    color: 0x7FADF8,
                    author: {
                    name: bot.user.username,
                    icon_url: bot.user.displayAvatarURL
                },
                    title: "Infowmation about ME! 0w0",
                    url: "https://github.com/HaLL-TsuNaMi/0w0",
                    description: "I'm bak and bettew than evew, now I can pway youw songs with my new DJ set that I got! UwU",
                    timestamp: new Date(),
                    footer: {
                        icon_url:bot.user.displayAvatarURL,
                        text: "Hope you enjoy my new wemix! UwU"
                    }
                }
            });
                break;
            case config.prefix + "commands":
                msg.reply({embed: {
                    color: 0x7FADF8,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.displayAvatarURL
                    },
                        title: "ping, info, shutdown, and the command you just used UwU",
                        timestamp: new Date()
                }});
                break;
            }
    });
}