import { InteractionResponseTypes } from '@lib/types/Enums';
import { InteractionCreatePacket } from '@root/src/events/interactionCreate';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { Event } from 'klasa';

export abstract class ApplicationCommand extends Event {

	public async run(data: InteractionCreatePacket) {
		const responseData = await this.handle(data);

		return axios.post(`https://discord.com/api/v8/interactions/${data.id}/${data.token}/callback`, { type: InteractionResponseTypes.ChannelMessageWithSource, data: responseData });
	}

	public abstract handle(data: InteractionCreatePacket): Promise<InteractionResponseData>;

}

export interface InteractionResponseData {
	tts?: boolean;
	content?: string;
	embeds?: MessageEmbed[];
	allowed_mentions?: AllowedMentions;
	flags?: number;
}

interface AllowedMentions {
	parse: AllowedMentionsTypes[];
	roles: string[];
	users: string[];
	replied_user: boolean;
}

type AllowedMentionsTypes = 'roles' | 'users' | 'everyone';
