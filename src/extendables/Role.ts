
import { Extendable, ExtendableOptions } from 'klasa';
import { Role } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<ExtendableOptions>({
	appliesTo: [Role]
})
export default class extends Extendable {

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
