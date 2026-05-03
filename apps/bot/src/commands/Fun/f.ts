import { LanguageKeys } from "#lib/i18n/index";
import { useT } from "#lib/i18n/utils";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { registerBasicCommand } from "#utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Press F to pay respects.",
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

		return interaction.editReply({
			content: t(LanguageKeys.Commands.Fun.FAlt),
			files: [{ attachment: "./assets/images/f.png" }],
		});
	}
}
