import { KlasaClient, Colors, KlasaClientOptions } from 'klasa';
import permissionLevels from '@lib/setup/permissionLevels';
import { Node as Lavalink } from 'lavalink';
import { LAVALINK_ENABLE } from '@root/config';

import '@lib/extensions/SteveGuild';
import '@lib/extensions/SteveUser';
import '@lib/schemas/client';
import '@lib/schemas/guild';
import '@lib/schemas/user';

export class SteveClient extends KlasaClient {

	public lavalink: Lavalink | null;

	public constructor(options: KlasaClientOptions = {}) {
		super(options);

		this.lavalink = LAVALINK_ENABLE ? new Lavalink({
			send: (guildID: string, packet: object): void => {
				const guild = this.guilds.cache.get(guildID);
				this.ws.shards.get(guild.shardID).send(packet);
			},
			...this.options.lavalink
		}) : null;

		this.permissionLevels = permissionLevels;

		if (this.lavalink !== null) {
			this.lavalink.once('open', () => this.console.verbose(`${new Colors({ text: 'magenta' }).format('[LAVALINK]')} Connected.`));
		}
	}

}
