import { CommandStore, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_8BALL_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_8BALL_EXTENDEDHELP'),
			examples: ['8ball will the jonathans ever stop being annoying?'],
			usage: '<question:reg/^[A-Za-z0-9_ ]+\\?/>',
			helpUsage: 'question?'
		});

		this
			.customizeResponse('question', msg => msg.language.get('COMMAND_8BALL_QUESTION_PROMPT'));
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const responses = msg.language.get('COMMAND_8BALL_RESPONSES') as string[];
		return msg.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	}

}
