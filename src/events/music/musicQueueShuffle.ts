import { Event } from 'klasa';
import { Message, TextChannel } from 'discord.js';

export default class extends Event {

	public run(channel: TextChannel): Promise<Message> {
		return channel.send('The queue was shuffled.');
	}

}
