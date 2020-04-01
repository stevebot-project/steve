import { Monitor, MonitorStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends Monitor {

	public constructor(store: MonitorStore, file: string[], directory: string) {
		super(store, file, directory, { allowedTypes: ['PINS_ADD'], ignoreOthers: false });
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.delete();
	}

}
