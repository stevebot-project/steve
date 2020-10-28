import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { Message } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_SETEMBEDCOLOR_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_SETEMBEDCOLOR_EXTENDED'),
			usage: '<color:color|reset|show>'
		});

		this.createCustomResolver('color', (str, possible, msg) => {
			if (/^#[0-9A-F]{6}$/i.test(str)) return str;
			throw msg.language.tget('RESOLVER_INVALID_COLOR', str);
		});
	}

	public async run(msg: KlasaMessage, [color]: [string]): Promise<Message> {
		if (color === 'reset') {
			await msg.author.settings.reset(UserSettings.EmbedColor);
		} else if (color !== 'show') {
			await msg.author.settings.update(UserSettings.EmbedColor, color);
		}

		if (color === 'show') {
			return msg.author.settings.get(UserSettings.EmbedColor) === null
				? msg.channel.send(msg.language.tget('COMMAND_SETEMBEDCOLOR_SHOW_NONE'))
				: msg.channel.send(msg.language.tget('COMMAND_SETEMBEDCOLOR_SHOW', msg.author.settings.get(UserSettings.EmbedColor)));
		}

		return color === 'reset'
			? msg.channel.send(msg.language.tget('COMMAND_SETEMBEDCOLOR_RESET'))
			: msg.channel.send(msg.language.tget('COMMAND_SETEMBEDCOLOR_SET', color));
	}

}
