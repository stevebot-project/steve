import googleIt from 'google-it';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { Colors } from '@lib/types/enums';
import { newEmbed } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['google, lmgtfy'],
			description: lang => lang.tget('COMMAND_GOOGLE_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_GOOGLE_EXTENDED'),
			usage: '<search:string{,200}>'
		});
	}

	public async run(msg: KlasaMessage, [search]: [string]): Promise<Message> {
		const res = await msg.channel.send(msg.language.tget('COMMAND_GOOGLE_INITIALRESPONSE'));

		const results = await googleIt({ query: search, limit: 5, disableConsole: true });

		const EMBED_DATA = msg.language.tget('COMMAND_GOOGLE_EMBED');

		const embed = newEmbed()
			.setColor(Colors.GoogleYellow)
			.setTitle(EMBED_DATA.TITLE(search));

		for (let i = 0; i < results.length; i++) {
			const currentResult = results[i];
			embed
				.addFields([
					{ name: `**${currentResult.title}**\n${currentResult.link}`, value: currentResult.snippet }
				]);
		}

		return res.edit('', { embed: embed });
	}

}
