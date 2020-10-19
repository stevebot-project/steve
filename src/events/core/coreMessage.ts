import { floatPromise } from '@utils/util';
import { Event, EventStore, KlasaMessage } from 'klasa';

module.exports = class extends Event {

	public constructor(store: EventStore, file: string[], directory: string) {
		super(store, file, directory, { event: 'message' });
	}

	public run(msg: KlasaMessage) {
		if (this.client.ready) floatPromise(this, this.client.monitors.run(msg));
	}

};
