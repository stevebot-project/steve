import googleIt from 'google-it';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { Colors } from '@lib/types/enums';
import { newEmbed } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Search Google for a phrase.',
			examples: ['google john green'],
			extendedHelp: 'The maximum character length for Google searches is 200.',
			usage: '<search:string{,200}>',
			helpUsage: 'query'
		});
	}

	public async run(msg: KlasaMessage, [search]: [string]): Promise<Message> {
		const res = await msg.channel.send('Using mad Google skillz...');

		const results = await googleIt({ query: search, limit: 5, disableConsole: true });

		const embed = newEmbed()
			.setColor(Colors.GoogleYellow)
			.setTitle(`Google results for ${search}`);

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
