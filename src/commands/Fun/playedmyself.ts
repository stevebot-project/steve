import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 60,
			cooldownLevel: 'channel',
			aliases: ['i played myself'],
			description: 'congratulations, you played yourself.',
			extendedHelp: 'this command returns the DJ Khaled GIF'
		});
	}

	async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send({ files: [{ attachment: './assets/images/played_yourself.gif', name: 'played_yourself.gif' }] });
	}
}

