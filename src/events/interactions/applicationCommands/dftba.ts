import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { ApplyOptions } from '@skyra/decorators';
import { APIInteractionApplicationCommandCallbackData } from 'discord-api-types/payloads/v8';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: false
})
export default class extends ApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(): Promise<APIInteractionApplicationCommandCallbackData> {
		return { content: this.client.languages.default.randomDftba };
	}

}
