import { Monitor, MonitorOptions, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<MonitorOptions>({
	allowedTypes: ['PINS_ADD'],
	ignoreOthers: false
})
export default class extends Monitor {

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.delete();
	}

}
