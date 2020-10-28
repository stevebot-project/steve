import { SteveClient } from '@lib/SteveClient';
import { Guild, Role, GuildMember, User } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ModerationCases } from './ModerationCases';


export class ModerationManager {

	public cases: ModerationCases;
	public client: SteveClient;
	public guild: Guild;

	public get deafenedRole(): Role | null {
		const roleSnowflake = this.guild.settings.get(GuildSettings.Roles.Deafened);
		if (!roleSnowflake) return null;
		return this.guild.roles.cache.has(roleSnowflake) ? this.guild.roles.cache.get(roleSnowflake)! : null;
	}

	public get mutedRole(): Role | null {
		const roleSnowflake = this.guild.settings.get(GuildSettings.Roles.Muted);
		if (!roleSnowflake) return null;
		return this.guild.roles.cache.has(roleSnowflake) ? this.guild.roles.cache.get(roleSnowflake)! : null;
	}

	public constructor(guild: Guild) {
		this.cases = new ModerationCases(guild.client as SteveClient, this);
		this.client = guild.client as SteveClient;
		this.guild = guild;
	}

	public async ban(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (target.bannable) {
			await target.ban({ reason, days: this.guild.settings.get(GuildSettings.Moderation.BanDeleteDays) })
				.catch(err => this.client.console.error(err));
		}
		return this;
	}

	public async deafen(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (this.deafenedRole) {
			await target.roles.add(this.deafenedRole, reason)
				.catch(err => this.client.console.error(err));
		}
		return this;
	}

	public async kick(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (target.kickable) {
			await target.kick(reason)
				.catch(err => this.client.console.error(err));
		}
		return this;
	}

	public async mute(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (this.mutedRole) {
			await target.roles.add(this.mutedRole, reason)
				.catch(err => this.client.console.error(err));
		}
		return this;
	}

	public async unban(target: User, reason: string): Promise<ModerationManager> {
		const ban = await this.guild.fetchBan(target);
		if (ban) {
			await this.guild.members.unban(target, reason)
				.catch(err => this.client.console.error(err));
		}
		return this;
	}

	public async undeafen(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (this.deafenedRole) {
			await target.roles.remove(this.deafenedRole, reason)
				.catch(err => this.client.console.error(err));
		}
		return this;
	}

	public async unmute(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (this.mutedRole) {
			await target.roles.remove(this.mutedRole, reason)
				.catch(err => this.client.console.error(err));
		}
		return this;
	}

}
