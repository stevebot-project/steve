import { ApplyOptions } from '@skyra/decorators';
import { Guild } from 'discord.js';
import { Event, EventOptions } from 'klasa';

@ApplyOptions<EventOptions>({
	event: 'guildDelete'
})
export default class extends Event {

	public run(guild: Guild) {
		if (this.client.ready && guild.available && !this.client.options.preserveSettings) guild.settings.destroy().catch(() => null);
	}

}
