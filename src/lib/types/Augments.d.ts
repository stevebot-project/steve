import { BaseNodeOptions, Node as Lavalink } from 'lavalink';
import { ModerationManager } from '@lib/structures/ModerationManager';

declare module 'discord.js' {
	interface Guild {
		readonly moderation: ModerationManager;
	}
}

declare module 'klasa' {
	interface KlasaClient {
		lavalink: Lavalink | null;
	}

	interface KlasaClientOptions {
		lavalink?: BaseNodeOptions;
	}

	interface Language {
		caseActions: any;
	}
}
