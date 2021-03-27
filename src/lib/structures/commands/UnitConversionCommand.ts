import { MessageEmbed } from 'discord.js';
import { CommandOptions, CommandStore, KlasaMessage, util } from 'klasa';
import { SteveCommand } from './SteveCommand';
import convert = require('convert-units');

export const lengthUnits = ['mm', 'cm', 'm', 'in', 'ft-us', 'ft', 'mi', 'km'] as const;
export const massUnits = ['mcg', 'mg', 'g', 'kg', 'oz', 'lb', 'mt', 't'] as const;
export const temperatureUnits = ['C', 'F', 'K', 'R'] as const;

type LengthUnitTuple = typeof lengthUnits;
type MassUnitTuple = typeof massUnits;
type TemperatureUnitTuple = typeof temperatureUnits;

type LengthUnit = LengthUnitTuple[number];
type MassUnit = MassUnitTuple[number];
type TemperatureUnit = TemperatureUnitTuple[number];

export type ConversionUnit = LengthUnit | MassUnit | TemperatureUnit;

export abstract class UnitConversionCommand extends SteveCommand {

	public lengthUnits = lengthUnits;
	public massUnits = massUnits;
	public temperatureUnits = temperatureUnits;

	protected constructor(store: CommandStore, file: string[], directory: string, options: CommandOptions) {
		super(store, file, directory, util.mergeDefault({ usage: '<number:number> <firstUnit:unit> <secondUnit:unit>' }, options));
	}

	public async run(msg: KlasaMessage, [num, firstUnit, secondUnit]: [number, ConversionUnit, ConversionUnit]) {
		// eslint-disable-next-line newline-per-chained-call
		const convertedValue = Number(convert(num).from(firstUnit).to(secondUnit).toFixed(2));

		const embed = new MessageEmbed()
			.addFields(
				{ name: convert().describe(firstUnit).plural, value: num, inline: true },
				{ name: convert().describe(secondUnit).plural, value: convertedValue, inline: true }
			)
			.setColor(0x71adcf);

		return msg.channel.send(embed);
	}

}
