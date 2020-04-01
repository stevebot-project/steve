import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Remove one of your songs from the queue.',
			examples: ['remove 1'],
			usage: '<num:integer>',
			helpUsage: 'number',
			music: ['SAME_VOICE_CHANNEL', 'QUEUE_NOT_EMPTY']
		});
	}

	public async run(msg: KlasaMessage, [num]: [number]): Promise<Message | void> {
		const { music } = msg.guild;
		if (!music.manageable(msg) && music.queue[num - 1].requester !== msg.member.id) throw 'I can\'t let you do that fam';
		return music.remove(num - 1, this.getChannel(msg));
	}

}
