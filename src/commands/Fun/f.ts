import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { registerBasicCommand } from "#utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
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
		const t = await this.prehandle(interaction);

		return interaction.editReply({
			content: t("commands/f:alt"),
			files: [{ attachment: "./assets/images/f.png" }],
		});
	}
}
