import { ApplyOptions } from '@skyra/decorators';
import { floatPromise } from '@utils/util';
import { Event, EventOptions, KlasaMessage } from 'klasa';

@ApplyOptions<EventOptions>({
	event: 'message'
})
export default class extends Event {

	public run(msg: KlasaMessage) {
		if (this.client.ready) floatPromise(this, this.client.monitors.run(msg));
	}

}
