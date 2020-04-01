import { Event } from 'klasa';
import { TextChannel, Message } from 'discord.js';

export default class extends Event {

	public run(channel: TextChannel): Promise<Message> {
		return channel.send('The queue was cleared.');
	}

}
