import { Task } from 'klasa';
import { TextChannel } from 'discord.js';

export default class extends Task {

	public async run({ guild, channel }): Promise<TextChannel> {
		const _guild = this.client.guilds.cache.get(guild);
		const _channel = _guild.channels.cache.get(channel) as TextChannel;
		if (!_channel) return;

		return _guild.channels.slow(_channel, 0);
	}

}
