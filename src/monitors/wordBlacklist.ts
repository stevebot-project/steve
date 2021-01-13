import { Monitor, MonitorOptions, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise } from '@utils/util';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<MonitorOptions>({
	ignoreEdits: false,
	ignoreOthers: false
})
export default class extends Monitor {

	public async run(msg: KlasaMessage): Promise<Message | unknown> {
		if (!msg.guild || !msg.guild.settings.get(GuildSettings.WordBlacklist.Enabled)) return;

		const blacklist = msg.guild.settings.get(GuildSettings.WordBlacklist.List) as string[];
		const filtered = await this.filter(msg.content, blacklist);

		if (filtered) {
			return msg.delete().then(() => {
				floatPromise(this, msg.channel.send(msg.guild!.language.tget('monitorWordblacklistFiltered')));
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
