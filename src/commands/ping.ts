import { ApplyOptions } from "@sapphire/decorators";
import { registerBasicCommand } from "#utils/util";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import type {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import type { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Run a connection test to Discord.",
})
export default class extends SteveCommand {
	public override registerApplicationCommands(
		registry: ApplicationCommandRegistry,
	) {
		registerBasicCommand(registry, this.name, this.description);
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		const t = await this.prehandle(interaction);
		const reply = await interaction.fetchReply();

		const reply_content = t("commands/ping:success", {
			latency: reply.createdTimestamp - interaction.createdTimestamp,
		});

		return interaction.editReply(reply_content);
	}
}
