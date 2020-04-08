import { Command, KlasaMessage, util, CommandStore, CommandOptions } from 'klasa';

export interface SteveCommandOptions extends CommandOptions {
	examples?: string[];
	helpUsage?: string;
}

export abstract class SteveCommand extends Command {

	public examples: string[] | undefined;
	public helpUsage: string | undefined;

	protected constructor(store: CommandStore, file: string[], directory: string, options: SteveCommandOptions) {
		super(store, file, directory, util.mergeDefault({ usageDelim: '|' }, options));

		this.examples = options.examples;
		this.helpUsage = options.helpUsage;

		this
			.customizeResponse('member', 'You must provide either a valid member\'s name, their long ID, or tag them.');
	}

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
	public run(msg: KlasaMessage, _params: any[]): any { return msg; }

}
