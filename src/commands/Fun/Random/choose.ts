import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_CHOOSE_DESCRIPTION'),
			examples: ['choose apples|oranges'],
			extendedHelp: lang => lang.get('COMMAND_CHOOSE_EXTENDEDHELP'),
			usage: '<choice1:string> <choice2:string> [...]',
			helpUsage: 'choice 1 | choice 2 | ...'
		});
	}

	public async run(msg: KlasaMessage, choices: string[]): Promise<Message> {
		return msg.channel.send(msg.language.get('COMMAND_CHOOSE_CHOICE', choices[Math.floor(Math.random() * choices.length)]));
	}

}
