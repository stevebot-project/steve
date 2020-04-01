import { Task } from 'klasa';
import { TextChannel } from 'discord.js';
import { ModerationManager } from '@lib/structures/moderation/ModerationManager';

export default class extends Task {

	public async run({ guild, channel }): Promise<ModerationManager> {
		const _guild = this.client.guilds.cache.get(guild);
		const _channel = _guild.channels.cache.get(channel) as TextChannel;
		if (!_channel) return;

		return _guild.moderation.slow(_channel, 0);
	}

}
