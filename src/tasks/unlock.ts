import { Task } from 'klasa';
import { TextChannel, Message } from 'discord.js';

export default class extends Task {

	public async run({ channel, guild }): Promise<Message> {
		const _guild = this.client.guilds.cache.get(guild);
		const _channel = _guild.channels.cache.get(channel) as TextChannel;
		if (!_channel) return;

		await _guild.moderation.unlock(_channel);

		return _channel.send('This channel has been unlocked.');
	}

}
