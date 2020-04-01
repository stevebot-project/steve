import { Extendable, ExtendableStore } from 'klasa';
import { Role } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Role] });
	}

	public get private(this: Role): boolean {
		return this.guild.settings.get(GuildSettings.Roles.Private).includes(this.id);
	}

}
