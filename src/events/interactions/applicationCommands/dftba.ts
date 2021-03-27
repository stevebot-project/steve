import { SimpleApplicationCommand } from '@lib/structures/events/SimpleApplicationCommand';
import { InteractionResponseData } from '@lib/types/Interactions';

export default class extends SimpleApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(): Promise<InteractionResponseData> {
		return { content: this.client.languages.default.randomDftba };
	}

}
