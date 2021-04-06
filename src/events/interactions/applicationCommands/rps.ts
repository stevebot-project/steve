import { checkWinner, chooseRandomPlay, rpsPlay } from '@lib/util/RockPaperScissors';
import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { Interaction, InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: false
})
export default class extends ApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(interaction: Interaction): Promise<InteractionApplicationCommandCallbackResponseData> {
		const playerPlay = interaction.data!.options![0].value as rpsPlay;
		const stevePlay = chooseRandomPlay();

		return { content: this.client.languages.default.tget('commandRockPaperScissorsWinner', playerPlay, stevePlay, checkWinner(stevePlay, playerPlay)) };
	}

}
