import { Event } from 'klasa';
import { TextChannel, Message } from 'discord.js';
import { MusicHandler } from '@lib/structures/music/MusicHandler';

export default class extends Event {

	public run(handler: MusicHandler, channel: TextChannel): Promise<Message> {
		return channel.send(`Replay set to ${handler.replay}.`);
	}

}
