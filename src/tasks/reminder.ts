
import { Task } from 'klasa';
import { Message } from 'discord.js';
import { OldReminderData, ReminderData } from '../extendables/Schedule';
import { floatPromise } from '@utils/util';

export default class extends Task {

	public async run(data: ReminderData | OldReminderData): Promise<Message | unknown> {
		// @ts-expect-error 2339
		const _channel = this.client.channels.cache.get(data.channelID ?? data.channel);
		// @ts-expect-error 2339
		const _user = await this.client.users.fetch(data.userID ?? data.user);

		if (_channel && _channel.isText()) {
			// @ts-expect-error 2339
			floatPromise(this, this.client.schedule.createSnooze(data.userID ?? data.user, data.content, data.channelID ?? data.channel));
			return _channel.send(`${_user}, here's the reminder you asked for: **${data.content}**`);
		}
	}

}
