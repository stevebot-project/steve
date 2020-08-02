import { CommandStore, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 5,
			cooldownLevel: 'author',
			description: lang => lang.get('COMMAND_RATE_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_RATE_EXTENDED'),
			usage: '<thing:string>'
		});
	}

	public async run(msg: KlasaMessage, [thing]: [string]): Promise<Message> {
		return msg.channel.send(msg.language.tget('COMMAND_RATE_RESPONSE', thing, Math.floor((Math.random() * 10) + 1)));
	}

}
