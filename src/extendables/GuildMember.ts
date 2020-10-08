/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Extendable, ExtendableStore } from 'klasa';
import { GuildMember } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [GuildMember] });
	}

	// @ts-expect-error 2784
	public get isAdmin(this: GuildMember): boolean {
		return this.roles.cache.has(this.guild.settings.get(GuildSettings.Roles.Administrator));
	}

	// @ts-expect-error 2784
	public get isMod(this: GuildMember): boolean {
		return this.roles.cache.has(this.guild.settings.get(GuildSettings.Roles.Moderator));
	}

	// @ts-expect-error 2784
	public get isStaff(this: GuildMember): boolean {
		return (this.isAdmin || this.isMod);
	}

}
