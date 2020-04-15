import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 60,
			cooldownLevel: 'channel',
			description: lang => lang.get('COMMAND_AUDINO_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_AUDINO_EXTENDEDHELP')
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send({ files: [{ attachment: './assets/images/john_screech.png', name: 'john_screech.png' }] });
	}

}
