import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 30,
			cooldownLevel: 'author',
			description: lang => lang.tget('COMMAND_DFTBA_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_DFTBA_EXTENDED')
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.randomDftba);
	}

}
