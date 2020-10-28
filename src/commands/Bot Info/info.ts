import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['details', 'what'],
			guarded: true,
			description: lang => lang.tget('COMMAND_INFO_DESCRIPTION')
		});
	}

	public async run(msg: KlasaMessage) {
		return msg.channel.send(msg.language.tget('COMMAND_INFO'));
	}

}
