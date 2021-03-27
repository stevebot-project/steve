import { InteractionResponseTypes } from '@lib/types/Enums';
import { InteractionCreatePacket, InteractionResponseData } from '@lib/types/Interactions';
import axios from 'axios';
import { Event } from 'klasa';

export abstract class SimpleApplicationCommand extends Event {

	public async run(data: InteractionCreatePacket) {
		const responseData = await this.handle(data);

		return axios.post(`https://discord.com/api/v8/interactions/${data.id}/${data.token}/callback`, { type: InteractionResponseTypes.ChannelMessageWithSource, data: responseData });
	}

	public abstract handle(data: InteractionCreatePacket): Promise<InteractionResponseData>;

}
