import { LanguageKeys } from "#lib/i18n/index";
import {
	SteveCommand,
	SteveCommandOptions,
} from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import {
	EmbedBuilder,
	InteractionContextType,
	type ChatInputCommandInteraction,
} from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description:
		"Snippets are small pieces of information that can be quickly accessed.",
	shouldDefer: true,
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
	public override async slashRun(
		interaction: ChatInputCommandInteraction,
		t: SteveT,
	) {
		if (!interaction.inCachedGuild()) {
			return interaction.editReply(
				t(LanguageKeys.General.Errors.NotInCachedGuild),
			);
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
