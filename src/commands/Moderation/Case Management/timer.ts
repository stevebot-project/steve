import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage, ScheduledTask } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { Message } from 'discord.js';
import { friendlyDuration } from '@lib/util/util';
import { ModerationCase } from '@lib/structures/moderation/ModerationManager';

const ModerationTaskNames = {
	ban: 'unban',
	deafen: 'undeafen',
	mute: 'unmute'
};

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Add a timer to a moderation case.',
			examples: ['timer 5|10m'],
			extendedHelp: 'The timer will start when you run this command, it will *not* use the time when the case was created as the start time.',
			helpUsage: 'case number|duration',
			permissionLevel: PermissionLevels.MODERATOR,
			usage: '<caseNumber:casenumber> <duration:timespan>'
		});
	}

	public async run(msg: KlasaMessage, [thisCase, duration]: [ModerationCase, number]): Promise<Message> {
		if (this.client.schedule.get(thisCase.task)) {
			await (this.client.schedule.get(thisCase.task) as ScheduledTask).delete(); // eslint-disable-line no-extra-parens
		}

		const task = await this.client.schedule.createModerationTask(msg.guild, thisCase.target, ModerationTaskNames[thisCase.action], duration);
		await msg.guild.moderation.attachTaskToCase(duration, task.id, thisCase.number);

		return msg.channel.send(`Set a timer for ${friendlyDuration(duration)} for case ${thisCase.number}.`);
	}

}
