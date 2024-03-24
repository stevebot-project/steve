import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { ApplyOptions } from "@sapphire/decorators";
import type {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import { Stopwatch } from "@sapphire/stopwatch";
import { codeBlock, isThenable } from "@sapphire/utilities";
import type { ChatInputCommandInteraction } from "discord.js";
import { inspect } from "util";

@ApplyOptions<CommandOptions>({
	description: "Evaluates JavaScript code. Reserved for my owners.",
	preconditions: ["isOwner"],
})
export default class extends SteveCommand {
	public override registerApplicationCommands(
		registry: ApplicationCommandRegistry,
	) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption((option) =>
					option
						.setName("expression")
						.setDescription("The expression to be evaluated.")
						.setRequired(true),
				)
				.addIntegerOption((option) =>
					option
						.setName("depth")
						.setDescription("Customizes util.inspect's depth."),
				)
				.addBooleanOption((option) =>
					option
						.setName("silent")
						.setDescription("Make the command output nothing."),
				)
				.addBooleanOption((option) =>
					option
						.setName("async")
						.setDescription(
							"Wraps the code in an async function; you need to use the return keyword here!",
						),
				)
				.addBooleanOption((option) =>
					option
						.setName("show_hidden")
						.setDescription("Enables the showHidden option on util.inspect."),
				),
		);
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		const t = await this.prehandle(interaction);

		const { success, result, time } = await this.eval(interaction);

		let output = t(success ? "commands/eval:output" : "commands/eval:error", {
			result: codeBlock("ts", result),
			time,
		});

		if (interaction.options.getBoolean("silent")) return null;

		if (output.length > 2000) {
			this.container.client.emit("log", result);

			output = t("commands/eval:send_console", { time });
			return interaction.editReply(output);
		}
		return interaction.editReply(output);
	}

	private async eval(interaction: ChatInputCommandInteraction) {
		const options = {
			code: interaction.options.getString("expression")!,
			depth: interaction.options.getInteger("depth"),
			async: interaction.options.getBoolean("async"),
			showHidden: interaction.options.getBoolean("showHidden"),
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
				depth: options.depth ? options.depth || 0 : 0,
				showHidden: Boolean(options.showHidden),
			});
		}

		return { success, time: this.formatTime(syncTime, asyncTime), result };
	}

	private formatTime(syncTime: string, asyncTime: string | undefined) {
		return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
	}
}
