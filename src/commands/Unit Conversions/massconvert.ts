import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { getConvertedValue, getFullUnitName, MassUnit, massUnits } from '@utils/UnitConversion';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['mass'],
	description: lang => lang.tget('commandMassConvertDescription'),
	extendedHelp: lang => lang.tget('commandMassConvertExtended'),
	usage: '<number:number> <firstUnit:unit> <secondUnit:unit>'
})
@CreateResolvers([
	[
		'unit',
		(str, possible, msg) => {
			str = str.toLowerCase();

			// @ts-expect-error 2345
			if (massUnits.includes(str)) return str;

			switch (str) {
				case 'micrograms':
					return 'mcg';
				case 'microgram':
					return 'mcg';
				case 'milligrams':
					return 'mg';
				case 'milligram':
					return 'mg';
				case 'grams':
					return 'g';
				case 'gram':
					return 'g';
				case 'kilograms':
					return 'kg';
				case 'kilogram':
					return 'kg';
				case 'ounces':
					return 'oz';
				case 'ounce':
					return 'oz';
				case 'pounds':
					return 'lb';
				case 'pound':
					return 'lb';
				case 'metric tonnes':
					return 'mt';
				case 'metric tonne':
					return 'mt';
				case 'tons':
					return 't';
				case 'ton':
					return 't';
				default:
					throw msg.language.tget('invalidUnit', str);
			}
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [num, firstUnit, secondUnit]: [number, MassUnit, MassUnit]) {
		const convertedValue = getConvertedValue(num, firstUnit, secondUnit);

		const embed = new MessageEmbed()
			.addFields(
				{ name: getFullUnitName(firstUnit, true), value: num, inline: true },
				{ name: getFullUnitName(secondUnit, true), value: convertedValue, inline: true }
			)
			.setColor(0x71adcf);

		return msg.channel.send(embed);
	}

}
