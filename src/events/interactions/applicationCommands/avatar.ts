import { SimpleApplicationCommand, SimpleApplicationCommandOptions } from '@lib/structures/events/SimpleApplicationCommand';
import { Interaction, InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import { ApplyOptions } from '@skyra/decorators';
import { MessageEmbed } from 'discord.js';

@ApplyOptions<SimpleApplicationCommandOptions>({
	guildOnly: false
})
export default class extends SimpleApplicationCommand {

	public async handle(interaction: Interaction): Promise<InteractionApplicationCommandCallbackResponseData> {
		const user = await this.client.users.fetch(interaction.data!.resolved!.users![interaction.data!.options![0].value as string].id);
		const embed = new MessageEmbed().setImage(user.displayAvatarURL({ dynamic: true }));

		return { embeds: [embed] };
	}

}
