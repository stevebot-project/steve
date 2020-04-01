import { Event } from 'klasa';
import { Song } from '@lib/structures/music/Song';
import { TextChannel, Message } from 'discord.js';

export default class extends Event {

	public async run(song: Song, channel: TextChannel): Promise<Message> {
		channel.setTopic(`🎚️ NOW PLAYING: ${song.safeTitle}`);

		const requester = await song.fetchRequester();
		return channel.send(`🎧 Now Playing: **${song.safeTitle}**, as requested by **${requester.tag}**!`);
	}

}
