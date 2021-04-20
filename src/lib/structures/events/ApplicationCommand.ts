import axios from 'axios';
import { Event, EventOptions, EventStore, util } from 'klasa';
import { CLIENT_ID as applicationID } from '@root/config';
import { APIInteractionApplicationCommandCallbackData, APIApplicationCommandInteraction, InteractionResponseType } from 'discord-api-types/payloads/v8';
import { isApplicationCommandGuildInteraction } from 'discord-api-types/utils/v8';

export abstract class ApplicationCommand extends Event {

	public ephemeral?: boolean;
	public guildOnly?: boolean;

	protected constructor(store: EventStore, file: string[], directory: string, options: ApplicationCommandOptions) {
		super(store, file, directory, util.mergeDefault({}, options));

		this.ephemeral = options ? options.ephemeral ?? false : false;
		this.guildOnly = options ? options.guildOnly ?? false : false;
	}

	public async run(interaction: APIApplicationCommandInteraction) {
		await this.defer(interaction.id, interaction.token, this.ephemeral);

		const callbackResponseData: APIInteractionApplicationCommandCallbackData
			= this.guildOnly && !isApplicationCommandGuildInteraction(interaction)
				? { content: this.client.languages.default.tget('interactionMustBeInGuild') }
				: await this.handle(interaction);

		return this.followup(interaction.token, callbackResponseData);
	}

	public abstract handle(data: APIApplicationCommandInteraction): Promise<APIInteractionApplicationCommandCallbackData>;

	private defer(interactionID: string, interactionToken: string, ephemeral = false) {
		return axios.post(`https://discord.com/api/v8/interactions/${interactionID}/${interactionToken}/callback`,
			{ type: InteractionResponseType.DeferredChannelMessageWithSource, data: { flags: ephemeral ? 64 : undefined } });
	}

	private followup(interactionToken: string, callbackResponseData: APIInteractionApplicationCommandCallbackData) {
		return axios.patch(`https://discord.com/api/v8/webhooks/${applicationID}/${interactionToken}/messages/@original`, callbackResponseData);
	}

}

export interface ApplicationCommandOptions extends EventOptions {
	ephemeral?: boolean;
	guildOnly?: boolean;
}
