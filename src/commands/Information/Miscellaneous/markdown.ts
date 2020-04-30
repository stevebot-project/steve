import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Markdown, Colors } from '@lib/types/enums';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { newEmbed } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_MARKDOWN_DESCRIPTION'),
			examples: ['markdown', 'markdown italics'],
			extendedHelp: lang => lang.get('COMMAND_MARKDOWN_EXTENDEDHELP'),
			usage: '[italics|bold|underline|strikeout|spoiler|quote]',
			helpUsage: '*italics* OR *bold* OR *underline* OR *strikeout* OR *spoiler* OR *quote*'
		});
	}

	public async run(msg: KlasaMessage, [type]: [string]): Promise<Message> {
		let res;

		if (!type) {
			res = newEmbed()
				.setTitle(msg.language.get('COMMAND_MARKDOWN_EMBED_TITLE'))
				.setColor(Colors.Orange)
				.setDescription(msg.language.get('COMMAND_MARKDOWN_EMBED_DESCRIPTION'))
				.addFields([
					{ name: 'Italics', value: Markdown.ITALICS, inline: true },
					{ name: 'Bold', value: Markdown.BOLD, inline: true },
					{ name: 'Underline', value: Markdown.UNDERLINE, inline: true },
					{ name: 'Strikeout', value: Markdown.STRIKEOUT, inline: true },
					{ name: 'Spoiler Tags', value: Markdown.SPOILERTAGS, inline: true },
					{ name: 'Quote', value: Markdown.QUOTE, inline: true },
					{ name: 'Block Quote', value: Markdown.BLOCKQUOTE, inline: true }
				]);
		} else if (type === 'italics') {
			res = Markdown.ITALICS;
		} else if (type === 'bold') {
			res = Markdown.BOLD;
		} else if (type === 'underline') {
			res = Markdown.UNDERLINE;
		} else if (type === 'strikeout') {
			res = Markdown.STRIKEOUT;
		} else if (type === 'spoiler') {
			res = Markdown.SPOILERTAGS;
		} else if (type === 'quote') {
			res = `Single-line: ${Markdown.QUOTE}\nBlock: ${Markdown.BLOCKQUOTE}`;
		}

		return msg.channel.send(res);
	}

}
