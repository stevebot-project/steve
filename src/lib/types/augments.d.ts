import { ScheduledTask } from 'klasa';
import { Snowflake, Guild, GuildMember, UserResolvable, TextChannel } from 'discord.js';
import { Node as Lavalink, BaseNodeOptions } from 'lavalink';
import { ModerationManager } from '@lib/structures/moderation/ModerationManager';
import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { PomodoroManager } from '@lib/structures/PomodoroManager';

declare module 'discord.js' {
	interface Guild {
		readonly moderation: ModerationManager;
		readonly music: MusicHandler;
		trustedRole: Role | null;
	}

	interface GuildChannelManager {
		lock(target: TextChannel): Promise<TextChannel>;
		lockedChannels: Snowflake[];
		slow(target: TextChannel, ratelimit: number): Promise<TextChannel>;
		unlock(target: TextChannel): Promise<TextChannel>;
	}

	interface GuildMember {
		isAdmin: boolean;
		isDJ: boolean;
		isMod: boolean;
		isStaff: boolean;
	}

	interface Role {
		private: boolean;
	}

	interface User {
		readonly pomodoro: PomodoroManager;
	}
}

declare module 'klasa' {
	interface KlasaClient {
		lavalink: Lavalink | null;
	}

	interface KlasaClientOptions {
		lavalink?: BaseNodeOptions;
	}

	interface Schedule {
		createModerationTask(guild: Guild, target: GuildMember | UserResolvable | TextChannel, taskType: string, time: number): Promise<ScheduledTask>;
		createReminderTask(user: string, content: string, duration: number, channel: string): Promise<ScheduledTask>;
		createRoleTask(duration: number, user: string, guild: string, role: string): Promise<ScheduledTask>;
		createSlowmodeTask(duration: number, guild: string, channel: string): Promise<ScheduledTask>;
		createUnlockTask(duration: number, channel: string, guild: string): Promise<ScheduledTask>;
		getUserReminders(snowflake: Snowflake): Promise<ScheduledTask[]>;
	}
}
