import { BaseNodeOptions, Node as Lavalink } from 'lavalink';
import { ModerationManager } from '@lib/structures/ModerationManager';
import { LanguageKeys } from 'klasa';
import { ModerationTask, ModerationTaskData, Reminder } from '../../extendables/Schedule';
import { TextChannel } from 'discord.js';
import { PermissionStrings } from '@skyra/decorators';

declare module 'discord.js' {
	interface Channel {
		isGuildTextChannel(): this is TextChannel;
	}
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
		dftba: string[];
		PERMISSIONS: PermissionStrings;
		randomDftba: string;
		randomLoadingMessage: string;
		tget<T extends SimpleLanguageKeys>(term: T): LanguageKeys[T];
		tget<T extends ComplexLanguageKeys>(term: T, ...args: Parameters<LanguageKeys[T]>): ReturnType<LanguageKeys[T]>;
	}

	interface Schedule {
		createModerationTask(taskName: ModerationTask, duration: number, taskData: ModerationTaskData): Promise<ScheduledTask>;
		createReminder(duration: number, userID: string, content: string, channelID: string): Promise<Reminder>;
		getUserReminders(userID: string): Reminder[];
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
