import { CommandStore, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['magic8ball'],
			cooldown: 5,
			cooldownLevel: 'author',
			description: lang => lang.get('COMMAND_8BALL_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_8BALL_EXTENDED'),
			usage: '<question:string>'
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const responses = msg.language.get('COMMAND_8BALL_RESPONSES') as string[];
		return msg.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	}

}
