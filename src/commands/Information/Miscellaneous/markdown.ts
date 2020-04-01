import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { oneLine } from 'common-tags';
import { Markdown, Colors } from '@lib/types/enums';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { newEmbed } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Gives information on how to use Markdown in Discord.',
			examples: ['markdown', 'markdown italics'],
			extendedHelp: 'Doing this command without providing an argument will return a concise explanation of Markdown',
			usage: '[italics|bold|underline|strikeout|spoiler|quote]',
			helpUsage: '*italics* OR *bold* OR *underline* OR *strikeout* OR *spoiler* OR *quote*'
		});
	}

	public async run(msg: KlasaMessage, [type]: [string]): Promise<Message> {
		let res;

		if (!type) {
			res = newEmbed()
				.setTitle('Markdown Info')
				.setColor(Colors.Orange)
				.setDescription(oneLine`Discord uses Markdown, a simple way to format text. This embed explains how to use
					Markdown. You can combine formatting techniques! For example, \`***text***\` will display as ***bold
					italics***. For single-line code blocks, put one backtick around both sides of your text. For a multi-line
					code block, put three backticks around both sides of your text.`)
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
