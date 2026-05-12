import { LanguageKeys } from "#lib/i18n/index";
import {
	SteveCommand,
	SteveCommandOptions,
} from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Press F to pay respects.",
	shouldDefer: true,
})
@RegisterChatInputCommand((builder, command) =>
	builder.setName(command.name).setDescription(command.description),
)
export default class extends SteveCommand {
	public override async slashRun(
		interaction: ChatInputCommandInteraction,
		t: SteveT,
	) {
		return interaction.editReply({
			content: t(LanguageKeys.Commands.Fun.FAlt),
			files: [{ attachment: "./assets/images/f.png" }],
		});
	}
}
