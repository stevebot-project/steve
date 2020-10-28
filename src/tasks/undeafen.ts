import { Task } from 'klasa';
import { ModerationTaskData } from '../extendables/Schedule';

export default class extends Task {

	public async run({ targetID, guildID }: ModerationTaskData): Promise<void> {
		const guild = this.client.guilds.cache.get(guildID);
		const targetUser = this.client.users.cache.get(targetID);

		if (guild && targetUser) {
			const member = await guild.members.fetch(targetUser);

			if (member && guild.moderation.deafenedRole && member.roles.cache.has(guild.moderation.deafenedRole.id)) {
				await guild.moderation.undeafen(member, guild.language.tget('MODERATION_NOREASON'));
			}
		}
	}

}
