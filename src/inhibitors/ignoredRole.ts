import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Inhibitor, InhibitorOptions, KlasaMessage } from 'klasa';

@ApplyOptions<InhibitorOptions>({
	spamProtection: true
})
export default class extends Inhibitor {

	public run(msg: KlasaMessage) {
		if (!msg.guild) return;

		const ignoredRoles = msg.guild.settings.get(GuildSettings.IgnoredRoles) as string[];

		for (const [id] of msg.member!.roles.cache) {
			if (ignoredRoles.includes(id) && !msg.member!.isStaff) return true;
		}
	}

}
