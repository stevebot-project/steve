import { Task } from 'klasa';
import { TextChannel, Message } from 'discord.js';

export default class extends Task {

	public async run({ channel, guild }: UnlockTaskData): Promise<Message | void> {
		const _guild = this.client.guilds.cache.get(guild);

		if (_guild) {
			const _channel = _guild.channels.cache.get(channel) as TextChannel;
			if (_channel) {
				await _guild.moderation.unlock(_channel);

				return _channel.send('This channel has been unlocked.');
			}
		}
	}

}

interface UnlockTaskData {
	channel: string;
	guild: string;
}
