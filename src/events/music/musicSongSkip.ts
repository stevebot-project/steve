import { Event } from 'klasa';
import { Song } from '@lib/structures/music/Song';
import { TextChannel, Message } from 'discord.js';
import { Emojis } from '@lib/types/enums';

export default class extends Event {

	public run(song: Song, channel: TextChannel): Promise<Message> {
		return channel.send(`${Emojis.Skip} **${song.safeTitle}** has been skipped.`);
	}

}
