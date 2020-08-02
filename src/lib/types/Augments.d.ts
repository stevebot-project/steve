import { BaseNodeOptions, Node as Lavalink } from 'lavalink';
import { ModerationManager } from '@lib/structures/ModerationManager';
import { ScheduledTask } from 'klasa';
import { ModerationTaskData } from '../../extendables/Schedule';
import { LanguageKeys } from './Languages';
import { PermissionString } from 'discord.js';

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
		isRestricted: boolean;
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
		PERMISSIONS: Record<PermissionString, string>;
		tget<T extends SimpleLanguageKeys>(term: T): LanguageKeys[T];
		tget<T extends ComplexLanguageKeys>(term: T, ...args: Parameters<LanguageKeys[T]>): ReturnType<LanguageKeys[T]>;
	}

	interface Schedule {
		createModerationTask(taskName: 'unmute' | 'undeafen' | 'unban', duration: number, taskData: ModerationTaskData): Promise<ScheduledTask>;
		createReminder(duration: number, userID: string, content: string, channelID: string): Promise<ScheduledTask>;
		getUserReminders(userID: string): ScheduledTask[];
	}
}

interface Fn {
	(...args: readonly any[]): unknown;
}

export type SimpleLanguageKeys = {
	[K in keyof LanguageKeys]: LanguageKeys[K] extends Fn ? never : K;
}[keyof LanguageKeys];

export type ComplexLanguageKeys = {
	[K in keyof LanguageKeys]: LanguageKeys[K] extends Fn ? K : never;
}[keyof LanguageKeys];
