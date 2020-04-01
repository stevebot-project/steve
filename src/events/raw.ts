import { Event } from 'klasa';

export default class extends Event {

	public run(pk): void {
		if (pk.t === 'VOICE_STATE_UPDATE') this.client.lavalink.voiceStateUpdate(pk.d);
		if (pk.t === 'VOICE_SERVER_UPDATE') this.client.lavalink.voiceServerUpdate(pk.d);
	}

}
