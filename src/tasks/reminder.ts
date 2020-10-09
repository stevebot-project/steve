/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Task } from 'klasa';
import { Message, TextChannel, DMChannel } from 'discord.js';
import { OldReminderData, ReminderData } from '../extendables/Schedule';

export default class extends Task {

	public async run(data: ReminderData | OldReminderData): Promise<Message> {
		// @ts-expect-error 2339
		const _channel = this.client.channels.cache.get(data.channelID ?? data.channel);
		// @ts-expect-error 2339
		const _user = this.client.users.cache.get(data.userID ?? data.user);

		return (_channel as TextChannel | DMChannel).send(`${_user}, here's the reminder you asked for: **${data.content}**`);
	}

}
