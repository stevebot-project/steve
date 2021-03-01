import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import { lengthUnits, LengthUnit, getConvertedValue, getFullUnitName } from '@lib/util/UnitConversion';

@ApplyOptions<CommandOptions>({
	aliases: ['length'],
	description: lang => lang.tget('commandLengthConvertDescription'),
	extendedHelp: lang => lang.tget('commandLengthConvertExtended'),
	usage: '<number:number> <firstUnit:unit> <secondUnit:unit>'
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
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [num, firstUnit, secondUnit]: [number, LengthUnit, LengthUnit]) {
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
