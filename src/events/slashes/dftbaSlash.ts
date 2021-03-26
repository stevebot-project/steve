import { ApplicationCommand } from '@lib/structures/events/ApplicationCommand';
import { InteractionResponseData } from '@lib/types/Interactions';

export default class extends ApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(): Promise<InteractionResponseData> {
		return { content: this.client.languages.default.randomDftba };
	}

}
