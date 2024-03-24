import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { ApplyOptions } from "@sapphire/decorators";
import type {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import { randomDftba, registerBasicCommand } from "#utils/util";
import type { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Get a fun random DFTBA!",
})
export default class extends SteveCommand {
	public override registerApplicationCommands(
		registry: ApplicationCommandRegistry,
	) {
		registerBasicCommand(registry, this.name, this.description);
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await this.prehandle(interaction);

		return interaction.editReply({ content: randomDftba() });
	}
}
