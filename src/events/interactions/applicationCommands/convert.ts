import { ConversionUnit } from '@lib/structures/commands/UnitConversionCommand';
import { ApplicationCommand } from '@lib/structures/events/ApplicationCommand';
import convert = require('convert-units');
import { APIApplicationCommandInteraction, APIInteractionApplicationCommandCallbackData, ApplicationCommandInteractionDataOptionSubCommand } from 'discord-api-types/payloads/v8';
import { MessageEmbed } from 'discord.js';

export default class extends ApplicationCommand {

	public async handle(interaction: APIApplicationCommandInteraction): Promise<APIInteractionApplicationCommandCallbackData> {
		const amount = (interaction.data.options![0] as ApplicationCommandInteractionDataOptionSubCommand).options![0].value as number;

		const firstUnit = (interaction.data.options![0] as ApplicationCommandInteractionDataOptionSubCommand)
			.options![1].value as ConversionUnit;

		const secondUnit = (interaction.data.options![0] as ApplicationCommandInteractionDataOptionSubCommand)
			.options![2].value as ConversionUnit;

		// eslint-disable-next-line newline-per-chained-call
		const convertedValue = Number(convert(amount).from(firstUnit).to(secondUnit).toFixed(2));

		const embed = new MessageEmbed()
			.addFields(
				{ name: convert().describe(firstUnit).plural, value: amount, inline: true },
				{ name: convert().describe(secondUnit).plural, value: convertedValue, inline: true }
			)
			.setColor(0x71adcf)
			.toJSON();

		return { embeds: [embed] };
	}

}
