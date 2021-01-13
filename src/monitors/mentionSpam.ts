import { Monitor, MonitorOptions, KlasaMessage } from 'klasa';
import { TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise } from '@utils/util';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<MonitorOptions>({
	ignoreEdits: false,
	ignoreOthers: false
})
export default class extends Monitor {

	public async run(msg: KlasaMessage): Promise<void> {
		if (msg.channel instanceof TextChannel) {
			const maxMentions = msg.guild!.settings.get(GuildSettings.MaxMentions);
			if (msg.mentions.users.size > maxMentions) {
				const spamMsg = await msg.delete();

				floatPromise(this, spamMsg.reply(msg.guild!.language.tget('monitorMentionspamMax', maxMentions)));
			}
		}

	}

}
