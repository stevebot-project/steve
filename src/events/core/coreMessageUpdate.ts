import { Event, EventOptions, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { floatPromise } from '@utils/util';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<EventOptions>({
	event: 'messageUpdate'
})
export default class extends Event {

	public run(old: Message, msg: Message) {
		if (this.client.ready && !old.partial && old.content !== msg.content) floatPromise(this, this.client.monitors.run(msg as KlasaMessage));
	}

}
