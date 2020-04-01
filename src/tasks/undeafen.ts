import { Task } from 'klasa';
import { ModerationManager } from '@lib/structures/moderation/ModerationManager';
import { ModerationTaskData } from '@lib/structures/commands/ModerationCommand';
import { GuildMember } from 'discord.js';

export default class extends Task {

	public async run({ guild, target }: ModerationTaskData): Promise<ModerationManager | void> {
		const _guild = this.client.guilds.cache.get(guild);
		const _target = await _guild.members.fetch(target).catch(err => this.client.console.error(err));
		if (_target) return _guild.moderation.undeafen(_target as GuildMember);
	}

}
