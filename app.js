// Libraries
const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const path = require('path');
const config = require("./config.json");
const pack = require("./package.json")
const token = process.env.token;

Structures.extend('Guild', function(Guild) {
	class MusicGuild extends Guild {
	  constructor(client, data) {
		super(client, data);
		this.musicData = {
		  queue: [],
		  isPlaying: false,
		  nowPlaying: null,
		  songDispatcher: null,
		  volume: 1
		};
		this.triviaData = {
		  isTriviaRunning: false,
		  wasTriviaEndCalled: false,
		  triviaQueue: [],
		  triviaScore: new Map()
		};
	  }
	}
	return MusicGuild;
  });
  
  const client = new CommandoClient ({
	commandPrefix: config.prefix,
	owner: config.OwnerID // value comes from config.json
  });
  
  client.registry
	.registerDefaultTypes()
	.registerGroups([
	  ['music', 'Music Command Group'],
	  ['gifs', 'Gif Command Group'],
	  ['other', 'random types of commands group'],
	  ['guild', 'guild related commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
	  eval: false,
	  prefix: false,
	  commandState: false
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));
  
  client.once('ready', () => {
	console.log(`*************0w0************`);
	console.log(`*                          *`);
	console.log(`*                          *`);
	console.log(`*   0w0: ${pack.version}             *`);
	console.log(`*   node: ${pack.engines.node}           *`);
	console.log(`*   npm: ${pack.dependencies.npm}           *`);
	console.log(`*                          *`);
	console.log(`*                          *`);
	console.log(`*************0w0************`);
	client.user.setActivity("with DJ Set");
  });
  
  client.on('voiceStateUpdate', async (___, newState) => {
	if (
	  newState.member.user.bot &&
	  !newState.channelID &&
	  newState.guild.musicData.songDispatcher &&
	  newState.member.user.id == client.user.id
	) {
	  newState.guild.musicData.queue.length = 0;
	  newState.guild.musicData.songDispatcher.end();
	  return;
	}
	if (
	  newState.member.user.bot &&
	  newState.channelID &&
	  newState.member.user.id == client.user.id &&
	  !newState.selfDeaf
	) {
	  newState.setSelfDeaf(true);
	}
  });
  
  client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome-goodbye'); // change this to the channel name you want to send the greeting to
	if (!channel) return;
	channel.send(`Welcome ${member}!`);
  });

// logs bot into discord and loads all the commands (obviously UwU???? like duh???)
client.login(token);