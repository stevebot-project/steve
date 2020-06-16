import { Task } from 'klasa';
import { ModerationTaskData } from '../extendables/Schedule';

export default class extends Task {

	public async run({ targetID, guildID }: ModerationTaskData): Promise<void> {
		const guild = this.client.guilds.cache.get(guildID);
		const target = this.client.users.cache.get(targetID);

		if (guild && target) {
			await guild.moderation.unban(target, guild.language.get('MODERATION_NOREASON'));
		}
	}

}
