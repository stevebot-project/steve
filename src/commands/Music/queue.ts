import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Display the current queue.',
			examples: ['queue']
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.guild.music.displayQueue(this.getChannel(msg));
	}

}
