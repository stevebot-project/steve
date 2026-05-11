import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { randomDftba } from "#utils/util";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import type { CommandOptions } from "@sapphire/framework";
import type { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Get a fun random DFTBA!",
})
@RegisterChatInputCommand((builder, command) =>
	builder.setName(command.name).setDescription(command.description),
)
export default class extends SteveCommand {
	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await this.prehandle(interaction);

		return interaction.editReply({ content: randomDftba() });
	}
}
