import { Event } from 'klasa';
import { TextChannel, Message } from 'discord.js';

export default class extends Event {

	public run(volume: number, channel: TextChannel): Promise<Message> {
		return channel.send(`Volume set to ${volume}.`);
	}

}
