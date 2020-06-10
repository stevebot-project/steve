import { KlasaClient, Colors, KlasaClientOptions, PermissionLevels } from 'klasa';
import permissionLevels from '@lib/setup/PermissionLevels';
import { Node as Lavalink } from 'lavalink';
import { LAVALINK_ENABLE } from '@root/config';
import { Guild } from 'discord.js';

import '@lib/schemas/Guild';
import '@lib/extensions/SteveGuild';


export class SteveClient extends KlasaClient {

	public lavalink: Lavalink | null;


	public constructor(options: KlasaClientOptions = {}) {
		super(options);

		this.lavalink = LAVALINK_ENABLE
			? new Lavalink({
				send: (guildID: string, packet: Record<string, unknown>) => {
					const guild: Guild | undefined = this.guilds.cache.get(guildID);
					if (guild) this.ws.shards.get(guild.shardID)!.send(packet);
					else throw new Error('Attempted to send a packet on the wrong shard!');
				},
				...this.options.lavalink
			})
			: null;

		this.permissionLevels = permissionLevels as PermissionLevels;

		if (this.lavalink !== null) {
			this.lavalink.once('open', () => this.console.verbose(`${new Colors({ text: 'magenta' }).format('[LAVALINK]')} Connected.`));
		}
	}

}
