import { MusicHandler } from '@lib/structures/music/MusicHandler';
import { LavalinkWebSocketClosedEvent } from '@utils/LavalinkUtils';
import { Colors, Event } from 'klasa';

export default class extends Event {

	private kHeader = new Colors({ text: 'magenta' }).format('[LAVALINK]');

	public run(handler: MusicHandler, payload: LavalinkWebSocketClosedEvent): void {
		this.client.console.log(`${this.kHeader} Websocket Close (${handler.guild.id})\nCode: ${payload.code}\nReason: ${payload.reason}`);
		handler.reset();
	}

}
