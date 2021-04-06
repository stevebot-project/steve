import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: false
})
export default class extends ApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(): Promise<InteractionApplicationCommandCallbackResponseData> {
		return { content: this.client.languages.default.randomDftba };
	}

}
