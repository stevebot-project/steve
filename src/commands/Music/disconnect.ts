import { MusicCommand } from '@lib/structures/commands/MusicCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { NAME } from '@root/config';
import { MusicHandler } from '@lib/structures/music/MusicHandler';

export default class extends MusicCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['leave'],
			description: `Disconnects ${NAME} from the voice channel.`,
			examples: ['disconnect'],
			music: ['MANAGEABLE']
		});
	}

	public async run(msg: KlasaMessage): Promise<MusicHandler> {
		return msg.guild!.music.leave(this.getChannel(msg));
	}

}
