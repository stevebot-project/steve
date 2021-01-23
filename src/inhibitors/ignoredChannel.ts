import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Inhibitor, KlasaMessage } from 'klasa';

export default class extends Inhibitor {

	public run(msg: KlasaMessage) {
		if (!msg.guild) return;

		const ignoredChannels = msg.guild.settings.get(GuildSettings.IgnoredChannels) as string[];
		if (ignoredChannels.includes(msg.channel.id) && !msg.member!.isStaff) return true;
	}

}
