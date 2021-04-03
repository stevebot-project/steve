import { checkWinner, chooseRandomPlay, rpsPlay } from '@lib/util/RockPaperScissors';
import { SimpleApplicationCommand, SimpleApplicationCommandOptions } from '@lib/structures/events/SimpleApplicationCommand';
import { Interaction, InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<SimpleApplicationCommandOptions>({
	guildOnly: false
})
export default class extends SimpleApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(interaction: Interaction): Promise<InteractionApplicationCommandCallbackResponseData> {
		const playerPlay = interaction.data!.options![0].value as rpsPlay;
		const stevePlay = chooseRandomPlay();

		return { content: this.client.languages.default.tget('commandRockPaperScissorsWinner', playerPlay, stevePlay, checkWinner(stevePlay, playerPlay)) };
	}

}
