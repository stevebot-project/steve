import { InteractionResponseType } from '@lib/types/Enums';
import { Interaction, InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import axios from 'axios';
import { Event, EventOptions, EventStore, util } from 'klasa';
import { CLIENT_ID as applicationID } from '@root/config';

export abstract class ApplicationCommand extends Event {

	public guildOnly: boolean;

	protected constructor(store: EventStore, file: string[], directory: string, options: ApplicationCommandOptions) {
		super(store, file, directory, util.mergeDefault({}, options));

		this.guildOnly = options.guildOnly;
	}

	public async run(interaction: Interaction) {
		await this.defer(interaction.id, interaction.token);

		const callbackResponseData: InteractionApplicationCommandCallbackResponseData = this.guildOnly && !interaction.guild_id
			? { content: this.client.languages.default.tget('interactionMustBeInGuild') }
			: await this.handle(interaction);

		return this.followup(interaction.token, callbackResponseData);
	}

	public abstract handle(data: Interaction): Promise<InteractionApplicationCommandCallbackResponseData>;

	private defer(interactionID: string, interactionToken: string) {
		return axios.post(`https://discord.com/api/v8/interactions/${interactionID}/${interactionToken}/callback`, { type: InteractionResponseType.DeferredChannelMessageWithSource });
	}

	private followup(interactionToken: string, callbackResponseData: InteractionApplicationCommandCallbackResponseData) {
		return axios.patch(`https://discord.com/api/v8/webhooks/${applicationID}/${interactionToken}/messages/@original`, callbackResponseData);
	}

}

export interface ApplicationCommandOptions extends EventOptions {
	guildOnly: boolean;
}
