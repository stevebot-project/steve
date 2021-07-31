import { Command, KlasaMessage, util, CommandStore, CommandOptions } from 'klasa';

export interface SteveCommandOptions extends CommandOptions {
	deprecatedForSlash?: string;
}

export abstract class SteveCommand extends Command {

	public deprecatedForSlash?: string;

	protected constructor(store: CommandStore, file: string[], directory: string, options: SteveCommandOptions) {
		super(store, file, directory, util.mergeDefault({
			usageDelim: '|'
		}, options));

		this.deprecatedForSlash = options.deprecatedForSlash;
	}

	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	public run(msg: KlasaMessage, _params: any[]): any { return msg; }

}
