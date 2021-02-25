import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { MessageEmbed } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const convert = require('convert-units');

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

			if (['C', 'F', 'K', 'R'].includes(str)) return str;
			if (str === 'CELSIUS' || str === 'FAHRENHEIT' || str === 'KELVIN' || str === 'RANKINE') return str[1];

			throw msg.language.tget('commandTempConvertInvalidUnit', str);
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [num, unitConvertingFrom, unitConvertingTo]: [number, temperatureUnit, temperatureUnit]) {
		// eslint-disable-next-line newline-per-chained-call
		const convertedValue = Number(convert(num).from(unitConvertingFrom).to(unitConvertingTo).toFixed(2));

		const embed = new MessageEmbed()
			.addFields(
				{ name: this.getFullUnitName(unitConvertingFrom), value: num, inline: true },
				{ name: this.getFullUnitName(unitConvertingTo), value: convertedValue, inline: true }
			)
			.setColor(0x71adcf);

		return msg.channel.send(embed);
	}

	private getFullUnitName(unit: temperatureUnit) {
		return convert().describe(unit).singular.split(' ')[1];
	}

}

type temperatureUnit = 'C' | 'F' | 'K' | 'R';
