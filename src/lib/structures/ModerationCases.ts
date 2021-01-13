import { SteveClient } from '@lib/SteveClient';
import { ModerationManager } from './ModerationManager';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { friendlyDuration } from '@utils/util';
import { User, MessageEmbed } from 'discord.js';
import { ScheduledTask } from 'klasa';

export interface ModerationCase {
	action: string;
	duration: string;
	moderator: string;
	number: number;
	reason: string;
	target: string;
	task: string | null;
	timestamp: number;
}

export class ModerationCases {

	public client: SteveClient;
	public manager: ModerationManager;

	public get caseArray(): ModerationCase[] { // returns a cloned array that can be edited without mutating the cache
		const cases = this.manager.guild.settings.get(GuildSettings.Moderation.Cases);
		return cases.slice();
	}

	public constructor(client: SteveClient, manager: ModerationManager) {
		this.client = client;
		this.manager = manager;
	}

	public async createCase(action: string, moderator: User, target: User, reason: string, duration: number | undefined, task: ScheduledTask | null): Promise<ModerationCase> {
		const newCase: ModerationCase
			= {
				action,
				duration: typeof duration === 'number' ? friendlyDuration(duration) : this.manager.guild.language.tget('moderationNoDuration'),
				moderator: moderator.id,
				number: this.caseArray.length + 1,
				reason,
				target: target.id,
				task: task ? task.id : null,
				timestamp: Date.now()
			};

		await this.manager.guild.settings.update(GuildSettings.Moderation.Cases, newCase, { action: 'add' });

		return newCase;
	}

	public async displayCase(thisCase: ModerationCase): Promise<MessageEmbed> {
		const thisCaseTarget = await this.client.users.fetch(thisCase.target);
		const thisCaseModerator = await this.client.users.fetch(thisCase.moderator);

		let thisCaseTask = '';
		if (thisCase.task && this.client.schedule.get(thisCase.task)) {
			// eslint-disable-next-line no-extra-parens
			thisCaseTask = `(${friendlyDuration((this.client.schedule.get(thisCase.task) as ScheduledTask).time.getTime() - Date.now())} left)`;
		}

		return new MessageEmbed()
			.addFields(
				{ name: this.manager.guild.language.tget('moderationCaseDisplayFieldTarget'), value: thisCaseTarget.tag, inline: true },
				{ name: this.manager.guild.language.tget('moderationCaseDisplayFieldModerator'), value: thisCaseModerator.tag, inline: true },
				{ name: this.manager.guild.language.tget('moderationCaseDisplayFieldDuration'), value: `${thisCase.duration} ${thisCaseTask}`, inline: true },
				{ name: this.manager.guild.language.tget('moderationCaseDisplayFieldReason'), value: thisCase.reason }
			)
			.setColor(0xffe16b)
			.setFooter(this.manager.guild.language.tget('moderationCaseDisplayFooter', thisCase.number, thisCase.target))
			.setTimestamp(thisCase.timestamp)
			.setTitle(this.manager.guild.language.caseActions[thisCase.action]);
	}

}
