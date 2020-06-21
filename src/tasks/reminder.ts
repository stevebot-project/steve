import { Task } from 'klasa';
import { Message, TextChannel, DMChannel } from 'discord.js';
import { ReminderData } from '../extendables/Schedule';

export default class extends Task {

	public async run({ userID, content, channelID }: ReminderData): Promise<Message> {
		const _channel = this.client.channels.cache.get(channelID);
		const _user = this.client.users.cache.get(userID);

		// eslint-disable-next-line
		return (_channel as TextChannel | DMChannel).send(`${_user}, here's the reminder you asked for: **${content}**`);
	}

}
