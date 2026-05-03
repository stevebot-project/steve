import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import { LogLevel, type Args, type CommandOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { Stopwatch } from "@sapphire/stopwatch";
import { cast, codeBlock, isThenable } from "@sapphire/utilities";
import type { Message } from "discord.js";
import { inspect } from "util";

@ApplyOptions<CommandOptions>({
	aliases: ["ev"],
	description: "Evaluates JavaScript code. Reserved for my owners.",
	flags: ["silent", "async", "show-hidden"],
	options: ["depth"],
	preconditions: ["isOwner"],
})
export default class extends SteveCommand {
	public override async messageRun(msg: Message, args: Args) {
		const t = useT(await fetchT(msg));

		const { success, result, time } = await this.eval(args);

		let output = t(
			success
				? LanguageKeys.Commands.System.EvalOutput
				: LanguageKeys.Commands.System.EvalError,
			{
				result: codeBlock("ts", result),
				time,
			},
		);

		if (args.getFlags("silent")) return null;

		if (output.length > 2000) {
			this.container.logger.write(LogLevel.None, result);
			output = t(LanguageKeys.Commands.System.EvalSendConsole, { time });
			return msg.reply(output);
		}
		return msg.reply(output);
	}

	private async eval(args: Args) {
		const options = {
			code: await args.rest("string"),
			depth: args.getOption("depth"),
			async: args.getFlags("async"),
			showHidden: args.getFlags("show-hidden"),
		};

		let code = options.code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

		const stopwatch = new Stopwatch();

		// eslint-disable-next-line one-var
		let success, syncTime, asyncTime, result;
		let thenable = false;

		try {
			if (options.async) code = `(async () => {\n${code}\n})();`;
			// eslint-disable-next-line no-eval
			result = eval(code);
			syncTime = stopwatch.toString();

			if (isThenable(result)) {
				thenable = true;
				stopwatch.restart();
				result = await result;
				asyncTime = stopwatch.toString();
			}

			success = true;
		} catch (error) {
			if (!syncTime) syncTime = stopwatch.toString();
			if (thenable && !asyncTime) asyncTime = stopwatch.toString();

			result = error;
			success = false;
		}

		stopwatch.stop();
		if (typeof result !== "string") {
			result = inspect(result, {
				depth: options.depth ? parseInt(options.depth, 10) : 0,
				showHidden: Boolean(options.showHidden),
			});
		}
		result = result.replaceAll(
			cast<string>(process.env.DISCORD_TOKEN ?? process.env.DISCORD_TOKEN_DEV),
			"[REDACTED]",
		);

		return { success, time: this.formatTime(syncTime, asyncTime), result };
	}

	private formatTime(syncTime: string, asyncTime: string | undefined) {
		return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
	}
}
