import { ScheduledTask } from 'klasa';
import { Snowflake } from 'discord.js';
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
	interface Schedule {
		getUserReminders(snowflake: Snowflake): Promise<ScheduledTask[]>;
	}

	interface KlasaClient {
		lavalink: Lavalink | null;
	}

	interface KlasaClientOptions {
		lavalink?: BaseNodeOptions;
	}
}
