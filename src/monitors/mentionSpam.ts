import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Monitor {

	public constructor(store: MonitorStore, file: string[], directory: string) {
		super(store, file, directory, { ignoreOthers: false, ignoreEdits: false });
	}

	public async run(msg: KlasaMessage): Promise<Message | void> {
		if (msg.channel instanceof TextChannel) {
			const maxMentions = msg.guild.settings.get(GuildSettings.MaxMentions);
			if (msg.mentions.users.size > maxMentions) {
				const spamMsg = await msg.delete();

				spamMsg.reply(`you tagged more than ${maxMentions} people. Chill out please.`);
			}
		}

		return;
	}

}
