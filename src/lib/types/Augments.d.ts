import { BaseNodeOptions, Node as Lavalink } from 'lavalink';
import { ModerationManager } from '@lib/structures/ModerationManager';
import { ScheduledTask } from 'klasa';
import { ModerationTaskData } from '../../extendables/Schedule';

declare module 'discord.js' {
	interface Guild {
		readonly moderation: ModerationManager;
	}

	interface GuildMember {
		isAdmin: boolean;
		isMod: boolean;
		isStaff: boolean;
	}

	interface Role {
		isAssignable: boolean;
	}
}

declare module 'klasa' {
	interface KlasaClient {
		emit(eventName: string, ...args: any[]): boolean;
		lavalink: Lavalink | null;
	}

	interface KlasaClientOptions {
		lavalink?: BaseNodeOptions;
	}

	interface Language {
		caseActions: any;
	}

	interface Schedule {
		createModerationTask(taskName: 'unmute' | 'undeafen' | 'unban', duration: number, taskData: ModerationTaskData): Promise<ScheduledTask>;
		createReminder(duration: number, userID: string, content: string, channelID: string): Promise<ScheduledTask>;
		getUserReminders(userID: string): ScheduledTask[];
	}
}
