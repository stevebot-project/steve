import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { useT } from "#utils/i18n";
import { registerBasicCommand } from "#utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import type {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
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
		await interaction.deferReply();
		const t = useT(await fetchT(interaction));
		const reply = await interaction.fetchReply();

		const reply_content = t(LanguageKeys.Commands.System.PingSuccess, {
			latency: reply.createdTimestamp - interaction.createdTimestamp,
		});

		return interaction.editReply(reply_content);
	}
}
