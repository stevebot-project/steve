import { Command, KlasaMessage, util, CommandStore, CommandOptions } from 'klasa';

export abstract class SteveCommand extends Command {

	protected constructor(store: CommandStore, file: string[], directory: string, options: CommandOptions) {
		super(store, file, directory, util.mergeDefault({ usageDelim: '|' }, options));
	}

	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	public run(msg: KlasaMessage, _params: any[]): any { return msg; }

}
