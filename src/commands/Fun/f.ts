import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 60,
			cooldownLevel: 'channel',
			description: 'Press F to pay respects.'
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send({ files: [{ attachment: './assets/images/f.png', name: 'pay_respects.png' }] });
	}

}
