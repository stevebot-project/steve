import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MusicHandler } from '@lib/structures/music/MusicHandler';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Seek to a specific point in the currently playing song.',
			examples: ['seek 30 seconds', 'seek 1m 30s'],
			music: ['VOICE_PLAYING', 'MANAGEABLE'],
			usage: '<position:timespan>',
			helpUsage: 'time'
		});
	}

	public async run(msg: KlasaMessage, [position]: [number]): Promise<MusicHandler> {
		return msg.guild!.music.seek(position, this.getChannel(msg));
	}

}
