import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MusicHandler } from '@lib/structures/music/MusicHandler';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Pauses playback.',
			examples: ['pause'],
			music: ['VOICE_PLAYING', 'SAME_VOICE_CHANNEL', 'MANAGEABLE']
		});
	}

	public async run(msg: KlasaMessage): Promise<MusicHandler> {
		return msg.guild.music.pause(this.getChannel(msg));
	}

}
