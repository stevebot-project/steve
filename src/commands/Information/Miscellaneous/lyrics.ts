import { CommandStore, KlasaMessage } from 'klasa';
import genius from 'genius-lyrics';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { TOKENS } from '@root/config';
import { Colors } from '@lib/types/enums';
import { newEmbed } from '@utils/util';

module.exports = class extends SteveCommand {

	constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['genius'],
			description: lang => lang.get('COMMAND_LYRICS_DESCRIPTION'),
			examples: ['lyrics accio deathly hallows'],
			usage: '<song:string>',
			helpUsage: 'song'
		});
	}

	public async run(msg: KlasaMessage, [song]: [string]): Promise<Message> {
		const Genius = new genius.Client(TOKENS.GENIUS);
		const search = await Genius.findTrack(song);
		const { hits } = search.response;

		if (!hits || hits.length < 1) throw msg.language.get('COMMAND_LYRICS_NOLYRICS');

		const embed = newEmbed()
			.setColor(Colors.BrightGreen)
			.setTitle(msg.language.get('COMMAND_LYRICS_EMBED_TITLE'));

		for (let i = 0; i < 5; i++) {
			if (!hits[i]) break;
			embed
				.addFields([
					{ name: hits[i].result.full_title, value: hits[i].result.url }
				]);
		}

		return msg.channel.send(embed);
	}

	public async init(): Promise<void> {
		if (!TOKENS.GENIUS) this.disable();
	}

};
