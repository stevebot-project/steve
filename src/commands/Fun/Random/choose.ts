import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { NAME } from '@root/config';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: `Have ${NAME} make a random choice for you.`,
			examples: ['choose apples|oranges'],
			extendedHelp: 'This command requires at least two choices.',
			usage: '<choice1:string> <choice2:string> [...]',
			helpUsage: 'choice 1 | choice 2 | ...'
		});
	}

	public async run(msg: KlasaMessage, choices: string[]): Promise<Message> {
		return msg.channel.send(`${this.client.user!.username} chooses... ${choices[Math.floor(Math.random() * choices.length)]}!`);
	}

}
