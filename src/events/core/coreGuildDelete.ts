import { Guild } from 'discord.js';
import { Event, EventStore } from 'klasa';

export default class extends Event {

	public constructor(store: EventStore, file: string[], directory: string) {
		super(store, file, directory, { event: 'guildDelete' });
	}

	public run(guild: Guild) {
		if (this.client.ready && guild.available && !this.client.options.preserveSettings) guild.settings.destroy().catch(() => null);
	}

}
