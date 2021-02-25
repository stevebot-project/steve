import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import convert = require('convert-units');
import { MessageEmbed } from 'discord.js';

const lengthUnits = ['mm', 'cm', 'm', 'in', 'ft-us', 'ft', 'mi', 'km'] as const;
type LengthUnitTuple = typeof lengthUnits;
type LengthUnit = LengthUnitTuple[number];

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
					throw msg.language.tget('commandLengthConvertInvalidUnit', str);
			}
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [num, firstUnit, secondUnit]: [number, LengthUnit, LengthUnit]) {
		const convertedValue = this.getConvertedValue(num, firstUnit, secondUnit);

		const embed = new MessageEmbed()
			.addFields(
				{ name: this.getFullUnitName(firstUnit), value: num, inline: true },
				{ name: this.getFullUnitName(secondUnit), value: convertedValue, inline: true }
			)
			.setColor(0x71adcf);

		return msg.channel.send(embed);
	}

	private getConvertedValue(num: number, firstUnit: LengthUnit, secondUnit: LengthUnit) {
		// eslint-disable-next-line newline-per-chained-call
		return Number(convert(num).from(firstUnit).to(secondUnit).toFixed(2));
	}

	private getFullUnitName(unit: LengthUnit) {
		return convert().describe(unit).plural;
	}

}
