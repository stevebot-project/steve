import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import {
	ApplicationCommandRegistry,
	type CommandOptions,
} from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import {
	AutocompleteInteraction,
	EmbedBuilder,
	InteractionContextType,
	type ChatInputCommandInteraction,
} from "discord.js";

@ApplyOptions<CommandOptions>({
	description:
		"Snippets are small pieces of information that can be quickly accessed.",
})
export default class extends SteveCommand {
	public override registerApplicationCommands(
		registry: ApplicationCommandRegistry,
	) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.setContexts(InteractionContextType.Guild)
				.addStringOption((option) =>
					option
						.setName("name")
						.setDescription("The name of the snippet that you'd like to view.")
						.setRequired(true)
						.setAutocomplete(true),
				),
		);
	}

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

	public override async autocompleteRun(
		interaction: AutocompleteInteraction<"cached">,
	) {
		const query = interaction.options.getFocused();

		const snippets = query
			? await this.container.settings.snippets.searchSnippetsByName(
					interaction.guildId,
					query,
				)
			: await this.container.settings.snippets.getGuildSnippets(
					interaction.guildId, // TODO: make sure this only grabs 25
				);

		const result = snippets.map((snippet) => ({
			name: snippet.name,
			value: snippet.name,
		}));

		return interaction.respond(result);
	}
}
