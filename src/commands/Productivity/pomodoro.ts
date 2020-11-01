import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['pomo', 'pom'],
			description: lang => lang.tget('COMMAND_POMODORO_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_POMODORO_EXTENDED')
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.tget('COMMAND_POMODORO_UNDERCONSTRUCTION'));
	}

}
