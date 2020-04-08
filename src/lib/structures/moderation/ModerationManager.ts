import { SteveClient } from '@lib/SteveClient';
import { Guild, Role, GuildMember, TextChannel, Snowflake, GuildChannel, User } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export class ModerationManager {

	public client: SteveClient;
	public guild: Guild;

	public get deafenedRole(): Role | null {
		const snowflake = this.guild.settings.get(GuildSettings.Roles.Deafened);
		return snowflake && this.guild.roles.cache.has(snowflake) ? this.guild.roles.cache.get(snowflake) as Role : null;
	}

	public get lockedChannels(): Snowflake[] {
		const filter = (channel: GuildChannel): boolean => {
			if (channel instanceof TextChannel) {
				if (!channel.permissionOverwrites.has(this.guild.id)) return false;
				if (channel.permissionOverwrites.get(this.guild.id)!.deny.has('SEND_MESSAGES')) return true;
			}
			return false;
		};

		return this.guild.channels.cache.filter(filter).map(channel => channel.id);
	}

	public get mutedRole(): Role | null {
		const snowflake = this.guild.settings.get(GuildSettings.Roles.Muted);
		return snowflake && this.guild.roles.cache.has(snowflake) ? this.guild.roles.cache.get(snowflake) as Role : null;
	}

	public constructor(guild: Guild) {
		this.client = guild.client as SteveClient;
		this.guild = guild;
	}

	public async ban(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (target.bannable) {
			await this.guild.members.ban(target, { reason });
		}
		return this;
	}

	public async deafen(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (this.deafenedRole) {
			await target.roles.add(this.deafenedRole, reason);
		}
		return this;
	}

	public async kick(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (target.kickable) {
			await target.kick(reason);
		}
		return this;
	}

	public async lock(target: TextChannel): Promise<ModerationManager> {
		if (!this.lockedChannels.includes(target.id)) {
			await target.updateOverwrite(this.guild.id, { SEND_MESSAGES: false });
		}
		return this;
	}

	public async mute(target: GuildMember, reason: string): Promise<ModerationManager> {
		if (this.mutedRole) {
			await target.roles.add(this.mutedRole, reason);
		}
		return this;
	}

	public async slow(target: TextChannel, ratelimit: number): Promise<ModerationManager> {
		await target.setRateLimitPerUser(ratelimit);
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

	public async unlock(target: TextChannel): Promise<ModerationManager> {
		if (this.lockedChannels.includes(target.id)) {
			await target.updateOverwrite(this.guild.id, { SEND_MESSAGES: true });
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
