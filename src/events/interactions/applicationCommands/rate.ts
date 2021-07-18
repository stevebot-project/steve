import { ApplicationCommand } from '@lib/structures/events/ApplicationCommand';
import { APIApplicationCommandInteraction, APIApplicationCommandInteractionDataOptionWithValues, APIInteractionApplicationCommandCallbackData } from 'discord-api-types/payloads/v8';

export default class extends ApplicationCommand {

	public async handle(interaction: APIApplicationCommandInteraction): Promise<APIInteractionApplicationCommandCallbackData> {
		const thingToBeRated = (interaction.data.options![0] as APIApplicationCommandInteractionDataOptionWithValues).value as string;

		return { content: this.client.languages.default.tget('commandRateResponse', thingToBeRated, Math.floor((Math.random() * 5) + 1)) };
	}

}
