import { Event } from 'klasa';
import { ModerationCase, ModerationManager } from '@lib/structures/moderation/ModerationManager';
import { Message } from 'discord.js';

export default class extends Event {

	public run(newCase: ModerationCase, manager: ModerationManager): Promise<Message> | void {
		if (manager.modlog) {
			return manager.modlog.send(manager.displayCase(newCase));
		}
	}

}
