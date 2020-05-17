import { SteveClient } from '@lib/SteveClient';
import { Guild, Role, GuildMember, TextChannel, User, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Events } from '@lib/types/enums';
import { newEmbed, friendlyDuration } from '@lib/util/util';
import { ScheduledTask } from 'klasa';

const ModerationActions = {
	ban: 'Member Banned',
	deafen: 'Member Deafened',
	kick: 'Member Kicked',
	mute: 'Member Muted',
	unban: 'User Unbanned',
	undeafen: 'Member Undeafened',
	unmute: 'Member Unmuted'
};

export interface ModerationCase {
	action: string;
	duration: string;
	moderator: string;
	number: number;
	reason: string;
	target: string;
	task: string;
	timestamp: number;
}

export class ModerationManager {

	public client: SteveClient;
	public guild: Guild;

	public get cases(): ModerationCase[] {
		return this.guild.settings.get(GuildSettings.ModerationCases);
	}

	public get deafenedRole(): Role | null {
		const snowflake = this.guild.settings.get(GuildSettings.Roles.Deafened);
		return snowflake ? this.guild.roles.cache.get(snowflake) : null;
	}

	public get modlog(): TextChannel | null {
		const snowflake = this.guild.settings.get(GuildSettings.Channels.Modlog);
		return snowflake ? this.guild.channels.cache.get(snowflake) as TextChannel : null;
	}

	public get mutedRole(): Role | null {
		const snowflake = this.guild.settings.get(GuildSettings.Roles.Muted);
		return snowflake ? this.guild.roles.cache.get(snowflake) : null;
	}

	public constructor(guild: Guild) {
		this.client = guild.client as SteveClient;
		this.guild = guild;
	}

	public async attachTaskToCase(duration: number, taskID: string, caseNumber: number): Promise<ModerationCase> {
		if (caseNumber > this.cases.length) throw `There is no case with the number ${caseNumber}.`;
		const casesClone = this.cases.slice();
		casesClone[caseNumber - 1].task = taskID;
		casesClone[caseNumber - 1].duration = friendlyDuration(duration);
		await this.guild.settings.update(GuildSettings.ModerationCases, casesClone, { action: 'overwrite' });
		return this.cases[caseNumber - 1];
	}

	public async ban(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (target.bannable) {
			await this.guild.members.ban(target, { reason: reason });
		}
		return this;
	}

	public async createCase(action: string, moderator: User, target: User, reason: string, duration: string, task: ScheduledTask | null): Promise<ModerationCase[]> {
		const newCase: ModerationCase
			= { action,
				duration,
				moderator: moderator.id,
				number: this.cases.length + 1,
				reason: reason || 'No reason provided.',
				target: target.id,
				task: task ? task.id : null,
				timestamp: Date.now() };

		await this.guild.settings.update(GuildSettings.ModerationCases, newCase, { action: 'add' });
		this.client.emit(Events.ModerationCaseAdd, newCase, this);

		return this.cases;
	}

	public async deafen(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (this.deafenedRole) {
			await target.roles.add(this.deafenedRole, reason);
		}
		return this;
	}

	public async deleteCase(caseNumber: number): Promise<ModerationCase[]> {
		const casesClone = this.cases.slice();
		casesClone.splice(caseNumber - 1, 1);
		await this.guild.settings.update(GuildSettings.ModerationCases, casesClone, { action: 'overwrite' });
		return this.cases;
	}

	public displayCase(thisCase: ModerationCase): MessageEmbed {
		const thisCaseTarget = this.client.users.cache.get(thisCase.target);
		const thisCaseModerator = this.client.users.cache.get(thisCase.moderator);

		let thisCaseTask = '';
		if (this.client.schedule.get(thisCase.task)) {
			// eslint-disable-next-line no-extra-parens
			thisCaseTask = `(${friendlyDuration((this.client.schedule.get(thisCase.task) as ScheduledTask).time.getTime() - Date.now())} left)`;
		}

		return newEmbed()
			.addFields(
				{ name: 'Target', value: thisCaseTarget.tag, inline: true },
				{ name: 'Moderator', value: thisCaseModerator.tag, inline: true },
				{ name: 'Duration', value: `${thisCase.duration} ${thisCaseTask}`, inline: true },
				{ name: 'Reason', value: thisCase.reason }
			)
			.setColor(0xffe16b)
			.setFooter(`Case ${thisCase.number} (${thisCase.target})`)
			.setTimestamp(thisCase.timestamp)
			.setTitle(ModerationActions[thisCase.action]);
	}

	public async editCaseReason(caseNumber: number, newReason: string): Promise<ModerationCase> {
		newReason = newReason || 'No reason provided.';
		const casesClone = this.cases.slice();
		casesClone[caseNumber - 1].reason = newReason;
		await this.guild.settings.update(GuildSettings.ModerationCases, casesClone, { action: 'overwrite' });
		return this.cases[caseNumber - 1];
	}

	public filterCasesByModerator(moderatorSnowflake: string): ModerationCase[] {
		return this.cases.filter(c => c.moderator === moderatorSnowflake);
	}

	public filterCasesByTarget(targetSnowflake: string): ModerationCase[] {
		return this.cases.filter(c => c.target === targetSnowflake);
	}

	public async kick(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (target.kickable) {
			await target.kick(reason);
		}
		return this;
	}

	public async mute(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (this.mutedRole) {
			await target.roles.add(this.mutedRole, reason);
		}
		return this;
	}

	public async unban(target: User): Promise<ModerationManager> {
		const bans = await this.guild.fetchBans();
		const bannedUsers = bans.map(ban => ban.user.id);
		if (bannedUsers.includes(target.id)) {
			await this.guild.members.unban(target);
		}
		return this;
	}

	public async undeafen(target: GuildMember): Promise<ModerationManager> {
		if (this.deafenedRole && target.roles.cache.has(this.deafenedRole.id)) {
			await target.roles.remove(this.deafenedRole);
		}
		return this;
	}

	public async unmute(target: GuildMember): Promise<ModerationManager> {
		if (this.mutedRole && target.roles.cache.has(this.mutedRole.id)) {
			await target.roles.remove(this.mutedRole);
		}
		return this;
	}

}
