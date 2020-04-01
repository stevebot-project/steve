import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { LavalinkStuckEvent } from '@utils/LavalinkUtils';
import { Event, Colors } from 'klasa';

export default class extends Event {

	private kHeader = new Colors({ text: 'magenta' }).format('[LAVALINK]');

	public async run(handler: MusicHandler, payload: LavalinkStuckEvent): Promise<void> {
		const { textChannel } = handler;

		if (textChannel === null || payload.thresholdMs < 1000) return;

		try {
			await textChannel.send(`${this.kHeader} The player is stuck! ${payload.thresholdMs}`);
		} catch (error) {
			this.client.console.error(error);
		}
	}

}
