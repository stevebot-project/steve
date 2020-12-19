
import { Extendable, ExtendableOptions } from 'klasa';
import { GuildMember } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<ExtendableOptions>({
	appliesTo: [GuildMember]
})
export default class extends Extendable {

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
