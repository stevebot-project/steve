import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { LavalinkExceptionEvent } from '@utils/LavalinkUtils';
import { Colors, Event } from 'klasa';

export default class extends Event {

	private kHeader = new Colors({ text: 'magenta' }).format('[LAVALINK]');

	public run(handler: MusicHandler, payload: LavalinkExceptionEvent): void {
		this.client.console.log(`${this.kHeader} Exception: (${handler.guild.id})\nTrack: ${payload.track}\nError: ${payload.error}`);
	}

}
