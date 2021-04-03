import { InteractionResponseType } from '@lib/types/Enums';
import { Interaction, InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import axios from 'axios';
import { Event, EventOptions, EventStore, util } from 'klasa';

export abstract class SimpleApplicationCommand extends Event {

	public guildOnly: boolean;

	protected constructor(store: EventStore, file: string[], directory: string, options: SimpleApplicationCommandOptions) {
		super(store, file, directory, util.mergeDefault({}, options));

		this.guildOnly = options.guildOnly;
	}

	public async run(data: Interaction) {
		const responseData: InteractionApplicationCommandCallbackResponseData = this.guildOnly && !data.guild_id ? { content: this.client.languages.default.tget('interactionMustBeInGuild') } : await this.handle(data);

		return axios.post(`https://discord.com/api/v8/interactions/${data.id}/${data.token}/callback`, { type: InteractionResponseType.ChannelMessageWithSource, data: responseData });
	}

	public abstract handle(data: Interaction): Promise<InteractionApplicationCommandCallbackResponseData>;


}

export interface SimpleApplicationCommandOptions extends EventOptions {
	guildOnly: boolean;
}
