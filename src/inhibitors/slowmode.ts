import { GuildMessage } from '@lib/types/Messages';
import { ApplyOptions } from '@skyra/decorators';
import { Inhibitor, InhibitorOptions, InhibitorStore, RateLimitManager } from 'klasa';

@ApplyOptions<InhibitorOptions>({
	spamProtection: true
})
export default class extends Inhibitor {

	public aggressive: boolean;
	public slowmode: RateLimitManager;

	public constructor(store: InhibitorStore, file: string[], directory: string) {
		super(store, file, directory);

		this.aggressive = this.client.options.slowmodeAggressive;
		this.slowmode = new RateLimitManager(1, this.client.options.slowmode);

		if (!this.client.options.slowmode) this.disable();
	}

	public run(msg: GuildMessage) {
		if (this.client.owners.has(msg.author)) return;

		const rateLimit = this.slowmode.acquire(msg.author.id);

		try {
			rateLimit.drip();
		} catch (err) {
			if (this.aggressive) rateLimit.resetTime();
			throw true;
		}
	}

}
