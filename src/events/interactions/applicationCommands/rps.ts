import { checkWinner, chooseRandomPlay, rpsPlay } from '@lib/util/RockPaperScissors';
import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { ApplyOptions } from '@skyra/decorators';
import { APIApplicationCommandInteraction, APIApplicationCommandInteractionDataOptionWithValues, APIInteractionApplicationCommandCallbackData } from 'discord-api-types/payloads/v8';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: false
})
export default class extends ApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(interaction: APIApplicationCommandInteraction): Promise<APIInteractionApplicationCommandCallbackData> {
		const playerPlay = (interaction.data.options![0] as APIApplicationCommandInteractionDataOptionWithValues).value as rpsPlay;
		const stevePlay = chooseRandomPlay();

		return { content: this.client.languages.default.tget('commandRockPaperScissorsWinner', playerPlay, stevePlay, checkWinner(stevePlay, playerPlay)) };
	}

}
