/*
** Play function, will do input validation and call distube.play()
** 
** @param message	The discord message object
** @param args		The search arguments
** @param distube	The distube object
** @return void
*/
const play = (message, args, distube)=>
{
	let	voice_channel;
	let autoplay;

	voice_channel = message.member.voice.channel;

	if (!args)
		return message.reply("No search or link provided.");
	if (!voice_channel)
		return message.reply("You are not in a vc.");
	distube.play(message, args);
}

/*
**Calls distube.stop() and prints leave message
**
** @param message	The discord message object
** @param distube	The distube object
** @erturn void
*/
const stop = (message, distube) =>
{
	distube.stop(message);
	message.channel.send("Stopped, leaving..");
}

/*
**Calls distube.getqueue() and displays queue
**
** @param message	The discord message object
** @param distube	The distube object
** @erturn void
*/
const display_queue = (message, distube) =>
{
	let queue;

	queue = distube.getQueue(message);
	if (!queue)
		return message.channel.send("No songs in queue");
	message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
		`${id + 1}. ${song.name} - \`${song.formattedDuration}\``
	).slice(0, 10).join("\n"))
}

/*
** calls distube.toggleautoplay and toggles autoplay
** 
** @param message	The discord message object
** @param distube	The distube object
** @erturn void
*/
const toggle_autoplay = (message, distube) =>
{
	let mode;

	mode = distube.toggleAutoplay(message);
	if (mode)
		return message.channel.send("Autoplay turned ON");
	return message.channel.send("Autoplay turned OFF");
}

/*
** calls distube.skip() and Skips the song
** 
** @param message	The discord message object
** @param distube	The distube object
** @erturn void
*/
const skip = (message, distube)=>
{
	distube.skip(message);
	message.channel.send('Skipping...\n');
}

module.exports = {
	play,
	stop,
	display_queue,
	skip,
	toggle_autoplay
}