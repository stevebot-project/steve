import { SimpleApplicationCommand, SimpleApplicationCommandOptions } from '@lib/structures/events/SimpleApplicationCommand';
import { InteractionCreatePacket, InteractionResponseData } from '@lib/types/Interactions';
import { ApplyOptions } from '@skyra/decorators';
import { MessageEmbed } from 'discord.js';

@ApplyOptions<SimpleApplicationCommandOptions>({
	guildOnly: false
})
export default class extends SimpleApplicationCommand {

	public async handle(data: InteractionCreatePacket): Promise<InteractionResponseData> {
		const user = await this.client.users.fetch(data.data.resolved.users![data.data.options[0].value].id);
		const embed = new MessageEmbed().setImage(user.displayAvatarURL({ dynamic: true }));

		return { embeds: [embed] };
	}

}
