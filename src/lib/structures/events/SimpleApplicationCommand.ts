import { InteractionResponseTypes } from '@lib/types/Enums';
import { InteractionCreatePacket, InteractionResponseData } from '@lib/types/Interactions';
import axios from 'axios';
import { Event, EventOptions, EventStore, util } from 'klasa';

export abstract class SimpleApplicationCommand extends Event {

	public guildOnly: boolean;

	protected constructor(store: EventStore, file: string[], directory: string, options: SimpleApplicationCommandOptions) {
		super(store, file, directory, util.mergeDefault({}, options));

		this.guildOnly = options.guildOnly;
	}

	public async run(data: InteractionCreatePacket) {
		const responseData: InteractionResponseData = this.guildOnly && !data.guild_id ? { content: this.client.languages.default.tget('interactionMustBeInGuild') } : await this.handle(data);

		return axios.post(`https://discord.com/api/v8/interactions/${data.id}/${data.token}/callback`, { type: InteractionResponseTypes.ChannelMessageWithSource, data: responseData });
	}

	public abstract handle(data: InteractionCreatePacket): Promise<InteractionResponseData>;


}

export interface SimpleApplicationCommandOptions extends EventOptions {
	guildOnly: boolean;
}
