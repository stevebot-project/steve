import { BaseNodeOptions, Node as Lavalink } from 'lavalink';

declare module 'klasa' {
	interface KlasaClient {
		lavalink: Lavalink | null;
	}

	interface KlasaClientOptions {
		lavalink?: BaseNodeOptions;
	}
}
