import { SimpleApplicationCommand, SimpleApplicationCommandOptions } from '@lib/structures/events/SimpleApplicationCommand';
import { InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<SimpleApplicationCommandOptions>({
	guildOnly: false
})
export default class extends SimpleApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(): Promise<InteractionApplicationCommandCallbackResponseData> {
		return { content: this.client.languages.default.randomDftba };
	}

}
