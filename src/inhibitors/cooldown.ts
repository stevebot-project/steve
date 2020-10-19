import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Inhibitor, InhibitorStore, KlasaMessage } from 'klasa';

export default class extends Inhibitor {

	public constructor(store: InhibitorStore, file: string[], directory: string) {
		super(store, file, directory, { spamProtection: true });
	}

	public run(msg: KlasaMessage, cmd: SteveCommand) {
		if (this.client.owners.has(msg.author) || cmd.cooldown <= 0) return;

		// eslint-disable-next-line @typescript-eslint/init-declarations
		let existing;

		try {
			// @ts-expect-error 2339
			existing = this.client.finalizers.get('commandCooldown').getCooldown(msg, cmd);
		} catch (err) {
			return;
		}

		if (existing && existing.limited) throw msg.language.get('INHIBITOR_COOLDOWN', Math.ceil(existing.remainingTime / 1000), cmd.cooldownLevel !== 'author');
	}

}
