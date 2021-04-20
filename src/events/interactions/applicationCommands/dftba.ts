import { ApplicationCommand } from '@lib/structures/events/ApplicationCommand';
import { APIInteractionApplicationCommandCallbackData } from 'discord-api-types/payloads/v8';

export default class extends ApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(): Promise<APIInteractionApplicationCommandCallbackData> {
		return { content: this.client.languages.default.randomDftba };
	}

}
