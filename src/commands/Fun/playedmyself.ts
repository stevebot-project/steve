import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['iplayedmyself'],
			cooldown: 60,
			cooldownLevel: 'channel',
			description: lang => lang.tget('COMMAND_PLAYEDMYSELF_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_PLAYEDMYSELF_EXTENDED')
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.tget('COMMAND_PLAYEDMYSELF_ID'),
			{ files: [{ attachment: './assets/images/played_yourself.mp4', name: 'played_yourself.mp4' }] });
	}

}
