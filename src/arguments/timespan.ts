import { Argument, Duration, util } from 'klasa';

export default class extends Argument {

	public run(arg: string): number {
		const duration = new Duration(arg);

		if (duration.offset > 0 && util.isNumber(duration.fromNow.getTime())) return duration.offset;
		throw `**${arg}** is not a valid timespan.`;
	}

}
