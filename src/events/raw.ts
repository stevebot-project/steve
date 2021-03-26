import { Event } from 'klasa';
import { CustomEvents } from '@lib/types/Enums';

export default class extends Event {

	public run(packet: RawEventPacket) {
		if (packet.t === 'INTERACTION_CREATE') this.client.emit(CustomEvents.InteractionCreate, packet.d);
	}

}

interface RawEventPacket {
	t: string | null;
	s: number | null;
	op: number;
	d: any;
}


