import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { registerBasicCommand } from "#utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "For when the audio cuts out and you must screm!",
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
			content: t("commands/audino:alt"),
			files: [{ attachment: "./assets/images/john_screech.png" }],
		});
	}
}
