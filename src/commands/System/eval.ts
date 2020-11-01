import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { CommandStore, KlasaMessage, Stopwatch, Type, util } from 'klasa';
import { inspect } from 'util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['ev'],
			description: lang => lang.tget('COMMAND_EVAL_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_EVAL_EXTENDEDHELP'),
			guarded: true,
			permissionLevel: PermissionsLevels.OWNER,
			usage: '<expression:str>'
		});
	}

	public async run(msg: KlasaMessage, [code]: [string]) {
		const { success, result, time, type } = await this.eval(msg, code);
		const footer = util.codeBlock('ts', type);
		const output = msg.language.get(success ? 'COMMAND_EVAL_OUTPUT' : 'COMMAND_EVAL_ERROR',
			time, util.codeBlock('js', result), footer);

		if ('silent' in msg.flagArgs) return null;

		// Handle too-long-messages
		if (output.length > 2000) {
			// @ts-expect-error 2339
			if (msg.guild && msg.channel.attachable) {
				// @ts-expect-error 2339
				return msg.channel.sendFile(Buffer.from(result), 'output.txt', msg.language.get('COMMAND_EVAL_SENDFILE', time, footer));
			}
			this.client.emit('log', result);
			return msg.sendLocale('COMMAND_EVAL_SENDCONSOLE', [time, footer]);
		}

		// If it's a message that can be sent correctly, send it
		return msg.send(output);
	}

	// Eval the input
	private async eval(msg: KlasaMessage, code: string) {
		const { flagArgs: flags } = msg;
		code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
		const stopwatch = new Stopwatch();
		// eslint-disable-next-line @typescript-eslint/init-declarations, one-var
		let success, syncTime, asyncTime, result, type;
		let thenable = false;
		try {
			if (flags.async) code = `(async () => {\n${code}\n})();`;
			// eslint-disable-next-line no-eval
			result = eval(code);
			syncTime = stopwatch.toString();
			type = new Type(result);
			if (util.isThenable(result)) {
				thenable = true;
				stopwatch.restart();
				result = await result;
				asyncTime = stopwatch.toString();
			}
			success = true;
		} catch (error) {
			if (!syncTime) syncTime = stopwatch.toString();
			if (!type) type = new Type(error);
			if (thenable && !asyncTime) asyncTime = stopwatch.toString();
			if (error && error.stack) this.client.emit('error', error.stack);
			result = error;
			success = false;
		}

		stopwatch.stop();
		if (typeof result !== 'string') {
			result = inspect(result, {
				depth: flags.depth ? parseInt(flags.depth, 10) || 0 : 0,
				showHidden: Boolean(flags.showHidden)
			});
		}
		return { success, type, time: this.formatTime(syncTime, asyncTime), result: util.clean(result) };
	}

	private formatTime(syncTime: string, asyncTime: string | undefined) {
		return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
	}

}
