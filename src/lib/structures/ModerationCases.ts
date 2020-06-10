import { SteveClient } from '@lib/SteveClient';
import { ModerationManager } from './ModerationManager';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { friendlyDuration, buildEmbed } from '@utils/util';
import { User, MessageEmbed } from 'discord.js';
import { ScheduledTask } from 'klasa';

interface ModerationCase {
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

	public async createCase(action: string, moderator: User, target: User, reason: string, duration: string, task: ScheduledTask | null): Promise<ModerationCase> {
		const newCase: ModerationCase
			= {
				action,
				duration,
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

		return buildEmbed()
			.addFields(
				{ name: this.manager.guild.language.get('MODERATION_CASE_DISPLAY_FIELD_TARGET'), value: thisCaseTarget.tag, inline: true },
				{ name: this.manager.guild.language.get('MODERATION_CASE_DISPLAY_FIELD_MODERATOR'), value: thisCaseModerator.tag, inline: true },
				{ name: this.manager.guild.language.get('MODERATION_CASE_DISPLAY_FIELD_DURATION'), value: `${thisCase.duration} ${thisCaseTask}`, inline: true },
				{ name: this.manager.guild.language.get('MODERATION_CASE_DISPLAY_FIELD_REASON'), value: thisCase.reason }
			)
			.setColor(0xffe16b)
			.setFooter(this.manager.guild.language.get('MODERATION_CASE_DISPLAY_FOOTER', thisCase.number, thisCase.target))
			.setTimestamp(thisCase.timestamp)
			.setTitle(this.manager.guild.language.caseActions[thisCase.action]);
	}

}
