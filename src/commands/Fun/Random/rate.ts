import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { NAME } from '@root/config';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: `Have ${NAME} rate something of your choosing.`,
			examples: ['rate eucalyptus leaves'],
			usage: '<thing:string>',
			helpUsage: 'thing'
		});
	}

	public async run(msg: KlasaMessage, [thing]: [string]): Promise<Message> {
		return msg.channel.send(`${NAME} gives ${thing} a ${Math.floor(Math.random() * 10) + 1}!`);
	}

}
