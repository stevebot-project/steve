import { Event } from 'klasa';

export default class extends Event {

	public async run(pk): void {
		if (pk.t === 'VOICE_STATE_UPDATE') return this.client.lavalink!.voiceStateUpdate(pk.d);
		if (pk.t === 'VOICE_SERVER_UPDATE') return this.client.lavalink!.voiceServerUpdate(pk.d);
	}

}
