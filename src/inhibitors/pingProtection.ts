import { Inhibitor, KlasaMessage, InhibitorStore } from 'klasa';

export default class extends Inhibitor {

	public constructor(store: InhibitorStore, file: string[], directory: string) {
		super(store, file, directory, { spamProtection: true });
	}

	public run(msg: KlasaMessage): Promise<void> {
		if (msg.channel.type === 'dm') return;

		if (msg.content.match(/<@&\d*>/)) {
			throw msg.language.tget('INHIBITOR_PINGPROTECTION_ROLEPING');
		}

		if (msg.content.match(/@everyone/)) {
			throw msg.language.tget('INHIBITOR_PINGPROTECTION_EVERYONE');
		}
	}

}
