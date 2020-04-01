import { Event } from 'klasa';
import { TextChannel, Message } from 'discord.js';
import { friendlyColonDuration } from '@lib/util/util';

export default class extends Event {

	public run(position: number, channel: TextChannel): Promise<Message> {
		const duration = friendlyColonDuration(position);
		return channel.send(`:fast_forward: Seeking to ${duration}!`);
	}

}
