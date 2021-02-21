import { Message } from 'discord.js';
import { Argument, Possible } from 'klasa';

export default class extends Argument {

	private dateRegex = /^(?<year>\d{4})(\/|-)(?<month>0?[1-9]|1[012])(\/|-)(?<day>0?[1-9]|[12][0-9]|3[01])$/;

	public run(arg: string, possible: Possible, msg: Message) {
		const match = arg.match(this.dateRegex);

		if (match) {
			const { year, month, day } = match.groups!;

			const date = new Date(Number(year), Number(month) - 1, Number(day));

			if (!isNaN(date.getTime())) return date;
		}

		throw msg.language.tget('resolverInvalidDate', possible.name);
	}

}
