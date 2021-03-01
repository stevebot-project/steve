import convert = require('convert-units');

export const lengthUnits = ['mm', 'cm', 'm', 'in', 'ft-us', 'ft', 'mi', 'km'] as const;
export const massUnits = ['mcg', 'mg', 'g', 'kg', 'oz', 'lb', 'mt', 't'] as const;
export const temperatureUnits = ['C', 'F', 'K', 'R'] as const;

type LengthUnitTuple = typeof lengthUnits;
type MassUnitTuple = typeof massUnits;
type TemperatureUnitTuple = typeof temperatureUnits;

export type LengthUnit = LengthUnitTuple[number];
export type MassUnit = MassUnitTuple[number];
export type TemperatureUnit = TemperatureUnitTuple[number];

type ConversionUnit = LengthUnit | MassUnit | TemperatureUnit;

export function getConvertedValue(num: number, firstUnit: ConversionUnit, secondUnit: ConversionUnit) {
	// eslint-disable-next-line newline-per-chained-call
	return Number(convert(num).from(firstUnit).to(secondUnit).toFixed(2));
}

export function getFullUnitName(unit: ConversionUnit, plural = false) {
	const description = convert().describe(unit);

	return plural ? description.plural : description.singular;
}
