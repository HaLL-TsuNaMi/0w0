const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'advance-song'],
      memberName: 'skip',
      group: 'music',
      description: 'Skip the current playing song',
      guildOnly: true
    });
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channew and twy again UwU');

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('Thewe is no song pwaying wight now! UwU');
    } else if (message.guild.triviaData.isTriviaRunning) {
      return message.reply(`You can't skip a twivia! Use end-trivia UwU`);
    }
    message.guild.musicData.songDispatcher.end();
  }
};
