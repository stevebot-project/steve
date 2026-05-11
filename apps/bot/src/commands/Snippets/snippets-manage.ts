import { LanguageKeys } from "#lib/i18n/index";
import { useT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { fetchT } from "@sapphire/plugin-i18next";
import { Subcommand, SubcommandOptions } from "@sapphire/plugin-subcommands";
import {
	ChatInputCommandInteraction,
	InteractionContextType,
	PermissionFlagsBits,
} from "discord.js";

@ApplyOptions<SubcommandOptions>({
	description: "Manage snippets.",
	subcommands: [
		{ name: "add", chatInputRun: "add" },
		{ name: "edit", chatInputRun: "edit" },
		{ name: "remove", chatInputRun: "remove" },
	],
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
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
)
export default class extends Subcommand {
	public async add(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		const name = interaction.options.getString("name", true);
		const content = interaction.options.getString("content", true);
		const embed = interaction.options.getBoolean("embed") ?? false;

		const existing = await this.container.settings.snippets.getSnippet(
			interaction.guildId,
			name,
		);

		if (existing) {
			return interaction.editReply(
				t(LanguageKeys.Commands.Snippets.ErrorAlreadyExists, { name }),
			);
		}

		await this.container.settings.snippets.createSnippet(
			interaction.guildId,
			name,
			content,
			embed,
		);

		return interaction.editReply(
			t(LanguageKeys.Commands.Snippets.AddSuccess, { name }),
		);
	}

	public async edit(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		const name = interaction.options.getString("name", true);
		const content = interaction.options.getString("content", true);
		const embed = interaction.options.getBoolean("embed");

		const existing = await this.container.settings.snippets.getSnippet(
			interaction.guildId,
			name,
		);

		if (!existing) {
			return interaction.editReply(
				t(LanguageKeys.Commands.Snippets.ErrorNotFound, { name }),
			);
		}

		await this.container.settings.snippets.editSnippet(
			interaction.guildId!,
			name,
			content,
			embed ?? existing.embed,
		);

		return interaction.editReply(
			t(LanguageKeys.Commands.Snippets.EditSuccess, { name }),
		);
	}

	public async remove(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		const name = interaction.options.getString("name", true);

		const existing = await this.container.settings.snippets.getSnippet(
			interaction.guildId,
			name,
		);

		if (!existing) {
			return interaction.editReply(
				t(LanguageKeys.Commands.Snippets.ErrorNotFound, { name }),
			);
		}

		await this.container.settings.snippets.deleteSnippet(
			interaction.guildId,
			name,
		);

		return interaction.editReply(
			t(LanguageKeys.Commands.Snippets.RemoveSuccess, { name }),
		);
	}
}
