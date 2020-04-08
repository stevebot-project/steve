import { Task } from 'klasa';
import { ModerationTaskData } from '@lib/structures/commands/ModerationCommand';
import { ModerationManager } from '@lib/structures/moderation/ModerationManager';

export default class extends Task {

	public run({ guild, target }: ModerationTaskData): Promise<ModerationManager> | void {
		const _guild = this.client.guilds.cache.get(guild);

		if (_guild) {
			const _target = this.client.users.cache.get(target);
			if (_target) return _guild.moderation.unban(_target);
		}
	}

}
