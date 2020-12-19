import { ApplyOptions } from '@skyra/decorators';
import { floatPromise } from '@utils/util';
import { Event, EventOptions, KlasaMessage } from 'klasa';

@ApplyOptions<EventOptions>({
	event: 'messageDelete'
})
export default class extends Event {

	public run(msg: KlasaMessage) {
		if (msg.command && msg.command.deletable) {
			for (const res of msg.responses) {
				floatPromise(this, res.delete());
			}
		}
	}

}
