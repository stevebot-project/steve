import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { APIApplicationCommandInteraction, APIApplicationCommandInteractionDataOptionWithValues, APIInteractionApplicationCommandCallbackData } from 'discord-api-types/payloads/v8';
import { ApplyOptions } from '@skyra/decorators';
import { MessageEmbed } from 'discord.js';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: false
})
export default class extends ApplicationCommand {

	public async handle(interaction: APIApplicationCommandInteraction): Promise<APIInteractionApplicationCommandCallbackData> {
		const user = await this.client.users.fetch(interaction.data.resolved!.users![(
			interaction.data.options![0] as APIApplicationCommandInteractionDataOptionWithValues).value as string].id);

		const embed = new MessageEmbed()
			.setImage(user.displayAvatarURL({ dynamic: true }))
			.toJSON();

		return { embeds: [embed] };
	}

}
