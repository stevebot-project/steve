import { CommandStore, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 60,
			cooldownLevel: 'channel',
			description: lang => lang.get('COMMAND_F_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_F_EXTENDED')
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.tget('COMMAND_F_ID'),
			{ files: [{ attachment: './assets/images/f.png', name: 'pay_respects.png' }] });
	}

}
