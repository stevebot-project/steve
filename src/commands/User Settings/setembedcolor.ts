import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandSetEmbedColorDescription'),
	extendedHelp: lang => lang.tget('commandSetEmbedColorExtended'),
	usage: '<color:color|reset|show>'
})
@CreateResolvers([
	[
		'color',
		(str, possible, msg) => {
			if (/^#[0-9A-F]{6}$/i.test(str)) return str;
			throw msg.language.tget('resolverInvalidColor', str);
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [color]: [string]): Promise<Message> {
		if (color === 'reset') {
			await msg.author.settings.reset(UserSettings.EmbedColor);
		} else if (color !== 'show') {
			await msg.author.settings.update(UserSettings.EmbedColor, color);
		}

		if (color === 'show') {
			return msg.author.settings.get(UserSettings.EmbedColor) === null
				? msg.channel.send(msg.language.tget('commandSetEmbedColorShowNone'))
				: msg.channel.send(msg.language.tget('commandSetEmbedColorShow', msg.author.settings.get(UserSettings.EmbedColor)));
		}

		return color === 'reset'
			? msg.channel.send(msg.language.tget('commandSetEmbedColorReset'))
			: msg.channel.send(msg.language.tget('commandSetEmbedColorSet', color));
	}

}
