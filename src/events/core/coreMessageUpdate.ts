import { Event, EventStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { floatPromise } from '@utils/util';

export default class extends Event {

	public constructor(store: EventStore, file: string[], directory: string) {
		super(store, file, directory, { event: 'messageUpdate' });
	}

	public run(old: Message, msg: Message) {
		if (this.client.ready && !old.partial && old.content !== msg.content) floatPromise(this, this.client.monitors.run(msg as KlasaMessage));
	}

}
