import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';
import { temperatureUnits, TemperatureUnit, getConvertedValue, getFullUnitName } from '@lib/util/UnitConversion';

@ApplyOptions<CommandOptions>({
	aliases: ['temp'],
	description: lang => lang.tget('commandTempConvertDescription'),
	extendedHelp: lang => lang.tget('commandTempConvertExtended'),
	usage: '<number:number> <firstUnit:unit> <secondUnit:unit>'
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
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [num, firstUnit, secondUnit]: [number, TemperatureUnit, TemperatureUnit]) {
		const convertedValue = getConvertedValue(num, firstUnit, secondUnit);

		const embed = new MessageEmbed()
			.addFields(
				{ name: getFullUnitName(firstUnit).split(' ')[1], value: num, inline: true },
				{ name: getFullUnitName(secondUnit).split(' ')[1], value: convertedValue, inline: true }
			)
			.setColor(0x71adcf);

		return msg.channel.send(embed);
	}

}
