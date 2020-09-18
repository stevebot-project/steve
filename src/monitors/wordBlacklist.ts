import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise } from '@utils/util';

export default class extends Monitor {

	public constructor(store: MonitorStore, file: string[], directory: string) {
		super(store, file, directory, {
			ignoreEdits: false,
			ignoreOthers: false
		});
	}

	public async run(msg: KlasaMessage): Promise<Message | unknown> {
		if (!msg.guild || !msg.guild.settings.get(GuildSettings.WordBlacklist.Enabled)) return;

		const blacklist = msg.guild.settings.get(GuildSettings.WordBlacklist.List) as string[];
		const filtered = await this.filter(msg.content, blacklist);

		if (filtered) {
			return msg.delete().then(() => {
				floatPromise(this, msg.reply('you used a word that is on the word blacklist. Please refrain from doing that again.'));
			});
		}
	}

	/* TODO: make this not suck to read */
	private filter(string: string, list: string[]): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (typeof string !== 'string') reject(new Error('word blacklist filter function "string" param should be a string'));
			string = string.replace(/[.,/#!$%^&*;:{}=\-_`~()@+=?"\u206a]/g, '');

			for (let i = 0; i < list.length; i++) {
				let regex = '';

				for (let j = 0; j < list[i].length; j++) {
					regex = j < 1 ? `${regex}${list[i][j]} *` : j > 1 ? `${regex} *${list[i][j]}` : regex + list[i][j];
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
