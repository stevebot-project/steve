import { checkWinner, chooseRandomPlay, rpsPlay } from '@lib/util/RockPaperScissors';
import { InteractionResponseData, ApplicationCommand } from '@lib/structures/events/ApplicationCommand';
import { InteractionCreatePacket } from '../interactionCreate';

export default class extends ApplicationCommand {

	// eslint-disable-next-line @typescript-eslint/require-await
	public async handle(data: InteractionCreatePacket): Promise<InteractionResponseData> {
		const playerPlay = data.data.options[0].value as rpsPlay;
		const stevePlay = chooseRandomPlay();

		return { content: this.client.languages.default.tget('commandRockPaperScissorsWinner', playerPlay, stevePlay, checkWinner(stevePlay, playerPlay)) };
	}

}
