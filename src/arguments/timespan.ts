import { Argument, Duration, util, Possible, KlasaMessage } from 'klasa';

export default class extends Argument {

	public run(arg: string, possible: Possible, msg: KlasaMessage): number {
		const duration = new Duration(arg);

		if (duration.offset > 0 && util.isNumber(duration.fromNow.getTime())) return duration.offset;
		throw msg.language.tget('ARGUMENT_TIMESPAN_INVALID', arg);
	}

}
