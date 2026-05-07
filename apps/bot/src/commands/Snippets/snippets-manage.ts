import { LanguageKeys } from "#lib/i18n/index";
import { useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { Snippet } from "@steve/database";
import {
	AutocompleteInteraction,
	InteractionContextType,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";

@ApplyOptions<Subcommand.Options>({
	description: "Manage snippets.",
	subcommands: [
		{ name: "add", chatInputRun: "add" },
		{ name: "edit", chatInputRun: "edit" },
		{ name: "remove", chatInputRun: "remove" },
	],
})
export default class extends Subcommand {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.setContexts(InteractionContextType.Guild)
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("add")
						.setDescription("Add a new snippet.")
						.addStringOption((option) =>
							option
								.setName("name")
								.setDescription("The name of the snippet.")
								.setRequired(true)
								.setMaxLength(100),
						)
						.addStringOption((option) =>
							option
								.setName("content")
								.setDescription("The content of the snippet.")
								.setRequired(true)
								.setMaxLength(1900),
						)
						.addBooleanOption((option) =>
							option
								.setName("embed")
								.setDescription("Whether to display the snippet as an embed.")
								.setRequired(false),
						),
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("edit")
						.setDescription("Edit an existing snippet.")
						.addStringOption((option) =>
							option
								.setName("name")
								.setAutocomplete(true)
								.setDescription("The name of the snippet.")
								.setRequired(true)
								.setMaxLength(100),
						)
						.addStringOption((option) =>
							option
								.setName("content")
								.setDescription("The new content of the snippet.")
								.setRequired(true)
								.setMaxLength(1900),
						)
						.addBooleanOption((option) =>
							option
								.setName("embed")
								.setDescription("Whether to display the snippet as an embed.")
								.setRequired(false),
						),
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("remove")
						.setDescription("Remove an existing snippet.")
						.addStringOption((option) =>
							option
								.setName("name")
								.setAutocomplete(true)
								.setDescription("The name of the snippet.")
								.setRequired(true)
								.setMaxLength(100),
						),
				),
		);
	}

	public async add(interaction: Subcommand.ChatInputCommandInteraction) {
		const t = useT(await fetchT(interaction));

		const name = interaction.options.getString("name", true);
		const content = interaction.options.getString("content", true);
		const embed = interaction.options.getBoolean("embed") ?? false;

		const existing = await this.container.settings.snippets.getSnippet(
			interaction.guildId!,
			name,
		);

		if (existing) {
			return interaction.reply({
				content: t(LanguageKeys.Commands.Snippets.ErrorAlreadyExists, { name }),
				flags: MessageFlags.Ephemeral,
			});
		}

		await this.container.settings.snippets.createSnippet(
			interaction.guildId!,
			name,
			content,
			embed,
		);

		return interaction.reply(
			t(LanguageKeys.Commands.Snippets.AddSuccess, { name }),
		);
	}

	public async edit(interaction: Subcommand.ChatInputCommandInteraction) {
		const t = useT(await fetchT(interaction));

		const name = interaction.options.getString("name", true);
		const content = interaction.options.getString("content", true);
		const embed = interaction.options.getBoolean("embed");

		const existing = await this.container.settings.snippets.getSnippet(
			interaction.guildId!,
			name,
		);

		if (!existing) {
			return interaction.reply({
				content: t(LanguageKeys.Commands.Snippets.ErrorNotFound, { name }),
				flags: MessageFlags.Ephemeral,
			});
		}

		await this.container.settings.snippets.editSnippet(
			interaction.guildId!,
			name,
			content,
			embed ?? existing.embed,
		);

		return interaction.reply(
			t(LanguageKeys.Commands.Snippets.EditSuccess, { name }),
		);
	}

	public async remove(interaction: Subcommand.ChatInputCommandInteraction) {
		const t = useT(await fetchT(interaction));

		const name = interaction.options.getString("name", true);

		const existing = await this.container.settings.snippets.getSnippet(
			interaction.guildId!,
			name,
		);

		if (!existing) {
			return interaction.reply({
				content: t(LanguageKeys.Commands.Snippets.ErrorNotFound, { name }),
				flags: MessageFlags.Ephemeral,
			});
		}

		await this.container.settings.snippets.deleteSnippet(
			interaction.guildId!,
			name,
		);

		return interaction.reply(
			t(LanguageKeys.Commands.Snippets.RemoveSuccess, { name }),
		);
	}

	public override async autocompleteRun(interaction: AutocompleteInteraction) {
		const subcommand = interaction.options.getSubcommand();

		if (subcommand === "edit" || subcommand === "remove") {
			return this.autocompleteSnippetName(interaction);
		}
	}

	private async autocompleteSnippetName(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused();
		const snippets: Snippet[] =
			await this.container.settings.snippets.getGuildSnippets(
				interaction.guildId!,
			);

		const filtered = snippets
			.filter((s) => s.name.startsWith(focusedValue))
			.slice(0, 25)
			.map((s) => ({ name: s.name, value: s.name }));

		return interaction.respond(filtered);
	}
}
