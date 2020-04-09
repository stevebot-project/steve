import { DOCS } from '@root/config';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage, Possible } from 'klasa';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Retrieves the links to certain Google Docs.',
			examples: ['doc list', 'doc tuatara report'],
			extendedHelp: 'Use "list" as the argument to get a list of all retrievable docs.',
			subcommands: true,
			usage: '<list|get:default> (doc:doc)',
			helpUsage: '*list* OR name'
		});

		this
			/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
			.createCustomResolver('doc', (str: string, possible: Possible, msg: KlasaMessage, [action]: [any]) => {
				if (action === 'list') return null;

				if (!DOCS[str]) throw `**${str}** is not a valid doc name.`;

				return DOCS[str];
			})
			.customizeResponse('doc', 'You must provide a valid doc name.');
	}

	public async list(msg: KlasaMessage): Promise<Message> {
		let list = '';

		for (const doc of DOCS) list += `${doc}\n`;

		return msg.channel.send(list);
	}

	public async get(msg: KlasaMessage, [doc]: [string]): Promise<Message> {
		return msg.channel.send(`Here's your doc! <${doc}>`);
	}

}
