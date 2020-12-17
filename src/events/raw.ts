import { Event } from 'klasa';
import { Events } from '@lib/types/Enums';

export default class extends Event {

	public run(packet: RawEventPacket) {
		if (packet.t === 'INTERACTION_CREATE') this.client.emit(Events.InteractionCreate, packet.d);
	}

}

interface RawEventPacket {
	t: string | null;
	s: number | null;
	op: number;
	d: any;
}


