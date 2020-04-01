import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MusicHandler } from '@lib/structures/music/MusicHandler';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Set the music volume.',
			examples: ['volume 100'],
			music: ['SAME_VOICE_CHANNEL', 'MANAGEABLE'],
			usage: '<volume:integer>',
			helpUsage: 'number'
		});
	}

	public async run(msg: KlasaMessage, [volume]: [number]): Promise<MusicHandler> {
		return msg.guild.music.setVolume(volume, this.getChannel(msg));
	}

}
