import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, ListenerOptions } from '@sapphire/framework';

@ApplyOptions<ListenerOptions>({ once: true })
export default class extends Listener<typeof Events.ClientReady> {

	public run() {
		return this.container.client.logger.info(`Logged in as ${this.container.client.user!.tag} and ready to serve ${this.container.client.guilds.cache.size} guilds!`);
	}

}
