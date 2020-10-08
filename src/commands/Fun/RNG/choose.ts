import { CommandStore, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 5,
			cooldownLevel: 'author',
			description: lang => lang.tget('COMMAND_CHOOSE_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_CHOOSE_EXTENDED'),
			usage: '<choice:string{,500}> [...]'
		});
	}

	public async run(msg: KlasaMessage, choices: string[]): Promise<Message> {
		if (choices.length < 2) throw msg.language.tget('COMMAND_CHOOSE_TOOFEW');
		return msg.channel.send(msg.language.tget('COMMAND_CHOOSE_RESPONSE', choices[Math.floor(Math.random() * choices.length)]));
	}

}
