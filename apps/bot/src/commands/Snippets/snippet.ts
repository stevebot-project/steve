import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { useT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { type CommandOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import {
	EmbedBuilder,
	InteractionContextType,
	type ChatInputCommandInteraction,
} from "discord.js";

@ApplyOptions<CommandOptions>({
	description:
		"Snippets are small pieces of information that can be quickly accessed.",
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("The name of the snippet that you'd like to view.")
				.setRequired(true)
				.setAutocomplete(true),
		),
)
export default class extends SteveCommand {
	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		const name = interaction.options.getString("name", true);
		const snippet = await this.container.settings.snippets.getSnippet(
			interaction.guildId,
			name,
		);

		if (!snippet) {
			return interaction.editReply(
				t(LanguageKeys.Commands.Snippets.ErrorNotFound, { name }),
			);
		}

		return interaction.editReply(
			snippet.embed
				? { embeds: [new EmbedBuilder().setDescription(snippet.content)] }
				: snippet.content,
		);
	}
}
