import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { UnitConversionCommand, temperatureUnits } from '@lib/structures/commands/UnitConversionCommand';
import { ApplicationCommands } from '@lib/types/Enums';
import { SteveCommandOptions } from '@lib/structures/commands/SteveCommand';

@ApplyOptions<SteveCommandOptions>({
	aliases: ['temp'],
	description: lang => lang.tget('commandTempConvertDescription'),
	deprecatedForSlash: ApplicationCommands.Convert,
	extendedHelp: lang => lang.tget('commandTempConvertExtended')
})
@CreateResolvers([
	[
		'unit',
		(str, possible, msg) => {
			str = str.toUpperCase();

			// @ts-expect-error 2345
			if (temperatureUnits.includes(str)) return str;
			if (str === 'CELSIUS' || str === 'FAHRENHEIT' || str === 'KELVIN' || str === 'RANKINE') return str[1];

			throw msg.language.tget('invalidUnit', str);
		}
	]
])
export default class extends UnitConversionCommand { }
