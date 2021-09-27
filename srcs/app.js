// Require the necessary discord.js classes
const Discord = require('discord.js');
const DisTube = require('distube');
const Commands = require("./commands");
const DisTubeInit = require("./distube_init.js");
require('dotenv').config();

//declare variables
TOKEN = process.env.BOT_TOKEN;
PREFIX = process.env.PREFIX;
BOT_NAME=process.env.BOT_NAME;

// Create instances
const bot = new Discord.Client(); // discord bot client
const distube = new DisTube(bot, {emitNewSongOnly: true , leaveOnFinish: true, updateYouTubeDL: false}); //distube instance

//initilize distube
DisTubeInit.init(distube)

// When the bot is ready, run this code (only once)
bot.on('ready', () => {
	console.log('Ready!');
});

/*
** Message listener. This function is run whenever a message appears
** 
** 1. Return if its a self sent message
** 2. Get the prefix of the received message
** 3. If the prefix is identical to our own prefix, execute the following:
** 	- get the argument string 
** 	- get the command
** 	- call helpers according to the command and pass in extracted data
*/
bot.on('message', (message)=>{
	let args;
	let	cmd;
	let autoplay;
	
	if (message.author.username == BOT_NAME)
		return ;
	if (!message.content.startsWith(PREFIX))
		return;
	args = message.content.slice(PREFIX.length).trim().split(/ +/g);
	cmd = args.shift();
	switch (cmd) {
		case "play":
			Commands.play(message, args.join(" "), distube);
			break;
		case "stop":
			Commands.stop(message, distube);
			break;
		case "queue":
			Commands.display_queue(message, distube);
			break;
		case "skip":
			Commands.skip(message, distube);
			break;
		case "autoplay":
			Commands.toggle_autoplay(message, distube);
			break;
		default:
			break;
	}
});

// Login to Discord with your bot's token
bot.login(TOKEN);