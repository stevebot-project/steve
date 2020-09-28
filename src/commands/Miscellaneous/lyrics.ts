import genius from 'genius-lyrics';
import { CommandStore, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message, MessageEmbed } from 'discord.js';
import { TOKENS } from '@root/config';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['genius'],
			description: lang => lang.tget('COMMAND_LYRICS_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_LYRICS_EXTENDED'),
			usage: '<song:string>'
		});
	}

	public async run(msg: KlasaMessage, [song]: [string]): Promise<Message> {
		const Genius = new genius.Client(TOKENS.GENIUS);
		const search = await Genius.findTrack(song);
		const { hits } = search.response;

		if (!hits || hits.length < 1) throw msg.language.tget('COMMAND_LYRICS_NOLYRICS');

		const EMBED_DATA = msg.language.tget('COMMAND_LYRICS_EMBED');

		const embed = new MessageEmbed()
			.setTitle(EMBED_DATA.TITLE);

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

}
