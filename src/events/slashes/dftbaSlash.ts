import { Event, Language } from 'klasa';
import axios from 'axios';
import { InteractionResponseTypes } from '@lib/types/Enums';

export default class extends Event {

	public run(interactionID: string, interactionToken: string, lang: Language) {
		const url = `https://discord.com/api/v8/interactions/${interactionID}/${interactionToken}/callback`;

		return axios.post(url, { type: InteractionResponseTypes.ChannelMessageWithSource, data: { content: lang.randomDftba } });
	}

}
