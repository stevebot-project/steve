import { ClientSettings } from '@lib/types/settings/ClientSettings';
import { floatPromise } from '@utils/util';
import { Guild } from 'discord.js';
import { Event, EventStore } from 'klasa';

export default class extends Event {

	public constructor(store: EventStore, file: string[], directory: string) {
		super(store, file, directory, { event: 'guildCreate' });
	}

	public run(guild: Guild) {
		if (!guild.available) return;
		if (this.client.settings!.get(ClientSettings.GuildBlacklist).includes(guild.id)) {
			floatPromise(this, guild.leave());
			this.client.emit('warn', `Blacklisted guild detected: ${guild.name} [${guild.id}]`);
		}
	}

}
