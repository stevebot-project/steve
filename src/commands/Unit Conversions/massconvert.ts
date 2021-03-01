import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { CommandOptions } from 'klasa';
import { UnitConversionCommand, massUnits } from '@lib/structures/commands/UnitConversionCommand';

@ApplyOptions<CommandOptions>({
	aliases: ['mass'],
	description: lang => lang.tget('commandMassConvertDescription'),
	extendedHelp: lang => lang.tget('commandMassConvertExtended')
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
export default class extends UnitConversionCommand { }
