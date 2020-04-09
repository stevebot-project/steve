import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Monitor {

	public constructor(store: MonitorStore, file: string[], directory: string) {
		super(store, file, directory, {
			ignoreEdits: false,
			ignoreOthers: false
		});
	}

	public async run(msg: KlasaMessage): Promise<Message | void> {
		if (!msg.guild || !msg.guild.settings.get(GuildSettings.WordBlacklist)) return;

		const blacklist = this.client.settings!.get('wordBlacklist') as string[];
		const filtered = await this.filter(msg.content, blacklist);

		if (filtered) {
			return msg.delete().then(() => msg.reply('you used a word that is on the word blacklist. Please refrain from doing that again.'));
		}
	}

	/* yes, we are aware that the code below is probably trash */
	private filter(string: string, list: string[]): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (typeof string !== 'string') reject(new Error('"String" param is not a string.'));
			string = string.replace(/[.,/#!$%^&*;:{}=\-_`~()@+=?"\u206a]/g, '');

			for (const word of list) {
				let regex = '';

				for (let j = 0; j < word.length; j++) {
					regex = j < 1 ? `${regex}${word[j]} *` : j > 1 ? `${regex} *${word[j]}` : regex + word[j];
				}
				const finishedRegex = new RegExp(regex, 'i');

				const match = string.match(finishedRegex);
				if (match === null) continue;

				if ((match.index !== 0 && string[match.index! - 1] !== ' ')
					|| (match.index! + match[0].length !== string.length && string[match.index! + match[0].length] !== ' ')) resolve(false);

				resolve(true);
			}
		});
	}

}
