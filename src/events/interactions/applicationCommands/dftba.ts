import { ApplicationCommand } from '@lib/structures/events/ApplicationCommand';
import { APIInteractionApplicationCommandCallbackData } from 'discord-api-types/payloads/v8';

export default class extends ApplicationCommand {

	public async handle(): Promise<APIInteractionApplicationCommandCallbackData> {
		return { content: this.client.languages.default.randomDftba };
	}

}
