import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_RATE_DESCRIPTION'),
			examples: ['rate eucalyptus leaves'],
			usage: '<thing:string>',
			helpUsage: 'thing'
		});
	}

	public async run(msg: KlasaMessage, [thing]: [string]): Promise<Message> {
		return msg.channel.send(msg.language.get('COMMAND_RATE_RATING', thing, Math.floor(Math.random() * 10) + 1));
	}

}
