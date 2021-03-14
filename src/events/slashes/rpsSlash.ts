import { Event, Language } from 'klasa';
import { checkWinner, chooseRandomPlay, rpsPlay } from '@lib/util/RockPaperScissors';
import axios from 'axios';
import { InteractionResponseTypes } from '@lib/types/Enums';

export default class extends Event {

	public run(playerPlay: rpsPlay, interactionID: string, interactionToken: string, lang: Language) {
		const stevePlay = chooseRandomPlay();
		const winner = checkWinner(stevePlay, playerPlay);

		const url = `https://discord.com/api/v8/interactions/${interactionID}/${interactionToken}/callback`;

		return axios.post(url, { type: InteractionResponseTypes.ChannelMessageWithSource, data: { content: lang.tget('commandRockPaperScissorsWinner', playerPlay, stevePlay, winner) } });
	}

}
