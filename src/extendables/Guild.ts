import { Extendable, ExtendableStore } from 'klasa';
import { Guild, Role } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Guild] });
	}

	public get trustedRole(this: Guild): Role | null {
		const snowflake = this.settings.get(GuildSettings.Roles.Trusted);
		return snowflake ? this.roles.cache.get(snowflake) : null;
	}

}
