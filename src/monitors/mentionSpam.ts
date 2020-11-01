import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise } from '@utils/util';

export default class extends Monitor {

	public constructor(store: MonitorStore, file: string[], directory: string) {
		super(store, file, directory, { ignoreOthers: false, ignoreEdits: false });
	}

	public async run(msg: KlasaMessage): Promise<void> {
		if (msg.channel instanceof TextChannel) {
			const maxMentions = msg.guild!.settings.get(GuildSettings.MaxMentions);
			if (msg.mentions.users.size > maxMentions) {
				const spamMsg = await msg.delete();

				floatPromise(this, spamMsg.reply(msg.guild!.language.tget('MONITOR_MENTIONSPAM_MAX', maxMentions)));
			}
		}

	}

}
