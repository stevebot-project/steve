import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { UnitConversionCommand, lengthUnits } from '@lib/structures/commands/UnitConversionCommand';
import { SteveCommandOptions } from '@lib/structures/commands/SteveCommand';
import { ApplicationCommands } from '@lib/types/Enums';
@ApplyOptions<SteveCommandOptions>({
	aliases: ['length'],
	description: lang => lang.tget('commandLengthConvertDescription'),
	deprecatedForSlash: ApplicationCommands.Convert,
	extendedHelp: lang => lang.tget('commandLengthConvertExtended')
})
@CreateResolvers([
	[
		'unit',
		(str, possible, msg) => {
			str = str.toLowerCase();

			// @ts-expect-error 2345
			if (lengthUnits.includes(str)) return str;

			switch (str) {
				case 'millimeters':
					return 'mm';
				case 'millimeter':
					return 'mm';
				case 'centimeters':
					return 'cm';
				case 'centimeter':
					return 'cm';
				case 'meters':
					return 'm';
				case 'meter':
					return 'm';
				case 'inches':
					return 'in';
				case 'inch':
					return 'in';
				case 'feet':
					return 'ft';
				case 'foot':
					return 'ft';
				case 'miles':
					return 'mi';
				case 'mile':
					return 'mi';
				case 'kilometers':
					return 'km';
				case 'kilometer':
					return 'km';
				default:
					throw msg.language.tget('invalidUnit', str);
			}
		}
	]
])
export default class extends UnitConversionCommand { }
