import { LanguageKeys } from "#lib/i18n/index";
import { SteveGuild } from "#lib/structures/SteveGuild";
import { useT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { fetchT } from "@sapphire/plugin-i18next";
import { Subcommand, SubcommandOptions } from "@sapphire/plugin-subcommands";
import { ChatInputCommandInteraction, InteractionContextType, MessageFlags, PermissionFlagsBits } from "discord.js";

@ApplyOptions<SubcommandOptions>({
	description: "Manage self-assignable roles.",
	subcommands: [
		{ name: "add", chatInputRun: "add" },
		{ name: "remove", chatInputRun: "remove" },
	],
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("add")
				.setDescription("Add a self-assignable role.")
				.addRoleOption((option) => option.setName("role").setDescription("The role to add.").setRequired(true)),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("remove")
				.setDescription("Set a role to no longer be self-assignable.")
				.addStringOption((option) =>
					option.setName("role").setDescription("The role to remove.").setRequired(true).setAutocomplete(true),
				),
		),
)
export default class extends Subcommand {
	public async add(interaction: ChatInputCommandInteraction) {
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		const role = interaction.options.getRole("role", true);
		const guild = await SteveGuild.get(interaction.guild);

		const assignableRoles = guild.settings!.roleAssignable;

		if (assignableRoles.includes(role.id)) {
			return interaction.reply({
				content: t(LanguageKeys.Commands.Assign.ErrorAlreadyAssignable, {
					name: role.name,
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		await this.container.settings.guilds.addAssignableRole(interaction.guildId, role.id);

		return interaction.reply({
			content: t(LanguageKeys.Commands.Assign.SuccessRoleAssignable, {
				name: role.name,
			}),
			flags: MessageFlags.Ephemeral,
		});
	}

	public async remove(interaction: ChatInputCommandInteraction) {
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		const roleName = interaction.options.getString("role", true);
		const guild = await SteveGuild.get(interaction.guild);

		const role = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === roleName.toLowerCase());

		if (!role) {
			return interaction.reply({
				content: t(LanguageKeys.Commands.Assign.ErrorRoleNotFound, {
					name: roleName,
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		const assignableRoles = guild.settings!.roleAssignable;

		if (!assignableRoles.includes(role.id)) {
			return interaction.reply({
				content: t(LanguageKeys.Commands.Assign.ErrorAlreadyNotAssignable, {
					name: role.name,
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		await this.container.settings.guilds.removeAssignableRole(interaction.guildId, role.id);

		return interaction.reply({
			content: t(LanguageKeys.Commands.Assign.SuccessRoleNotAssignable, {
				name: role.name,
			}),
			flags: MessageFlags.Ephemeral,
		});
	}
}
