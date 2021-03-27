import { checkWinner, chooseRandomPlay, rpsPlay } from '@lib/util/RockPaperScissors';
import { SimpleApplicationCommand } from '@lib/structures/events/SimpleApplicationCommand';
import { InteractionCreatePacket, InteractionResponseData } from '@lib/types/Interactions';

export default class extends SimpleApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(data: InteractionCreatePacket): Promise<InteractionResponseData> {
		const playerPlay = data.data.options[0].value as rpsPlay;
		const stevePlay = chooseRandomPlay();

		return { content: this.client.languages.default.tget('commandRockPaperScissorsWinner', playerPlay, stevePlay, checkWinner(stevePlay, playerPlay)) };
	}

}
