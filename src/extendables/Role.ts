/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Extendable, ExtendableStore } from 'klasa';
import { Role } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Role] });
	}

	// @ts-expect-error 2784
	public get isAssignable(this: Role): boolean {
		const assignables = this.guild.settings.get(GuildSettings.Roles.Assignable) as string[];
		return assignables.includes(this.id);
	}

	// @ts-expect-error 2784
	public get isRestrictd(this: Role): boolean {
		const restricted = this.guild.settings.get(GuildSettings.Roles.Restricted) as string[];
		return restricted.includes(this.id);
	}

}
