import { Task } from 'klasa';
import { ModerationTaskData } from '../extendables/Schedule';

export default class extends Task {

	public async run({ targetID, guildID }: ModerationTaskData): Promise<void> {
		const guild = this.client.guilds.cache.get(guildID);
		const targetUser = await this.client.users.fetch(targetID);

		if (guild && targetUser) {
			const member = await guild.members.fetch(targetUser);

			if (member && guild.moderation.mutedRole && member.roles.cache.has(guild.moderation.mutedRole.id)) {
				await guild.moderation.unmute(member, guild.language.tget('moderationNoReason'));
			}
		}
	}

}
