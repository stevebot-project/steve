import { ClientSettings } from '@lib/types/settings/ClientSettings';
import { ApplyOptions } from '@skyra/decorators';
import { floatPromise } from '@utils/util';
import { Guild } from 'discord.js';
import { Event, EventOptions } from 'klasa';

@ApplyOptions<EventOptions>({
	event: 'guildCreate'
})
export default class extends Event {

	public run(guild: Guild) {
		if (!guild.available) return;
		if (this.client.settings!.get(ClientSettings.GuildBlacklist).includes(guild.id)) {
			floatPromise(this, guild.leave());
			this.client.emit('warn', `Blacklisted guild detected: ${guild.name} [${guild.id}]`);
		}
	}

}
