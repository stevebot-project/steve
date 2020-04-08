import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { MusicHandler } from '@lib/structures/music/MusicHandler';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['repeat'],
			description: 'Set the replay value (toggles between true/false).',
			examples: ['replay'],
			music: ['SAME_VOICE_CHANNEL', 'MANAGEABLE']
		});
	}

	public async run(msg: KlasaMessage): Promise<MusicHandler> {
		const { music } = msg.guild!;
		return music.setReplay(!music.replay, this.getChannel(msg));
	}

}
