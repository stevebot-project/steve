import { Extendable, ExtendableStore } from 'klasa';
import { GuildMember } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [GuildMember] });
	}

	public get isAdmin(this: GuildMember): boolean {
		return this.roles.cache.has(this.guild.settings.get(GuildSettings.Roles.Administrator));
	}

	public get isMod(this: GuildMember): boolean {
		return this.roles.cache.has(this.guild.settings.get(GuildSettings.Roles.Moderator));
	}

	/* eslint-disable no-extra-parens */
	public get isStaff(this: GuildMember): boolean {
		return (this.isAdmin || this.isMod);
	}

	public get isDJ(this: GuildMember): boolean {
		return (this.isStaff || this.roles.cache.has(this.guild.settings.get(GuildSettings.Roles.DJ)));
	}

}
