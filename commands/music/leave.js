const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end', 'lv'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Leaves voice channel if in one'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply('Join a channew and twy again UwU');
      return;
    } else if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      message.reply('Thewe is no song pwaying wight now! UwU');
      return;
    } else if (!message.guild.musicData.queue) {
      message.reply('Thewe awe no songs in queue UmU');
      return;
    } else if (message.guild.musicData.songDispatcher.paused) {
      message.guild.musicData.songDispatcher.resume();
      setTimeout(() => {
        message.guild.musicData.songDispatcher.end();
      }, 100);
      message.guild.musicData.queue.length = 0;
      return;
    } else {
      message.guild.musicData.songDispatcher.end();
      message.guild.musicData.queue.length = 0;
      return;
    }
  }
};
