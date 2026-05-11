import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { useT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { CommandOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "For when the audio cuts out and you must screm!",
})
@RegisterChatInputCommand((builder, command) =>
	builder.setName(command.name).setDescription(command.description),
)
export default class extends SteveCommand {
	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const t = useT(await fetchT(interaction));

		return interaction.editReply({
			content: t(LanguageKeys.Commands.Fun.AudinoAlt),
			files: [{ attachment: "./assets/images/john_screech.png" }],
		});
	}
}
