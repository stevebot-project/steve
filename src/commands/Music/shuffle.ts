import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Song } from '@lib/structures/music/Song';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Shuffles the queue.',
			examples: ['shuffle'],
			music: ['SAME_VOICE_CHANNEL', 'QUEUE_NOT_EMPTY', 'MANAGEABLE']
		});
	}

	public async run(msg: KlasaMessage): Promise<Song[]> {
		return msg.guild.music.shuffle(this.getChannel(msg));
	}

}
