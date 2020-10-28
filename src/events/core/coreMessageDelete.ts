import { floatPromise } from '@utils/util';
import { Event, EventStore, KlasaMessage } from 'klasa';

export default class extends Event {

	public constructor(store: EventStore, file: string[], directory: string) {
		super(store, file, directory, { event: 'messageDelete' });
	}

	public run(msg: KlasaMessage) {
		if (msg.command && msg.command.deletable) {
			for (const res of msg.responses) {
				floatPromise(this, res.delete());
			}
		}
	}

}
