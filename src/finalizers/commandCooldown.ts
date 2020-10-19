import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Finalizer, FinalizerStore, KlasaMessage, RateLimitManager } from 'klasa';

export default class extends Finalizer {

	public constructor(store: FinalizerStore, file: string[], directory: string) {
		super(store, file, directory);
		// @ts-ignore 2339
		this.cooldowns = new WeakMap();
	}

	public run(msg: KlasaMessage, cmd: SteveCommand) {
		if (cmd.cooldown <= 0 || this.client.owners.has(msg.author)) return;

		try {
			this.getCooldown(msg, cmd).drip();
		} catch (err) {
			this.client.emit('error', `${msg.author.username}[${msg.author.id}] has exceeded the RateLimit for ${msg.command}`);
		}
	}

	public getCooldown(msg: KlasaMessage, cmd: SteveCommand) {
		// @ts-ignore 2339
		let cooldownManager = this.cooldowns.get(cmd);
		if (!cooldownManager) {
			cooldownManager = new RateLimitManager(cmd.bucket, cmd.cooldown * 1000);
			// @ts-ignore 2339
			this.cooldowns.set(cmd, cooldownManager);
		}
		return cooldownManager.acquire(msg.guild ? msg[cmd.cooldownLevel]!.id : msg.author.id);
	}

}
