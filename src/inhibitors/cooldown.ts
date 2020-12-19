import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { Inhibitor, InhibitorOptions, KlasaMessage } from 'klasa';

@ApplyOptions<InhibitorOptions>({
	spamProtection: true
})
export default class extends Inhibitor {

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
