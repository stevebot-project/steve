import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { SteveGuild } from "#lib/structures/SteveGuild";
import { useT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { CommandOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import {
	ChatInputCommandInteraction,
	InteractionContextType,
	MessageFlags,
} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Assign roles to yourself using Steve",
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.addStringOption((option) =>
			option
				.setName("role")
				.setDescription("The role to assign.")
				.setRequired(true)
				.setAutocomplete(true),
		),
)
export default class extends SteveCommand {
	// TODO: i18n, role being above bot
	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		const roleName = interaction.options.getString("role", true);
		const role = interaction.guild.roles.cache.find(
			(r) =>
				r.name.toLowerCase() === roleName.toLowerCase() || r.id === roleName,
		);

		if (!role) {
			return interaction.reply({
				content: t(LanguageKeys.Commands.Assign.ErrorRoleNotFound, {
					name: roleName,
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		const guild = await SteveGuild.get(interaction.guild);
		const assignableRoles = guild.settings!.roleAssignable;

		if (!assignableRoles.includes(role.id)) {
			return interaction.reply({
				content: t(LanguageKeys.Commands.Assign.ErrorNotSelfAssignable, {
					name: role.name,
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (interaction.member.roles.cache.has(role.id)) {
			await interaction.member.roles.remove(role);

			return interaction.reply({
				content: t(LanguageKeys.Commands.Assign.SuccessRoleRemoved, {
					name: role.name,
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		await interaction.member.roles.add(role);

		return interaction.reply({
			content: t(LanguageKeys.Commands.Assign.SuccessRoleAssigned, {
				name: role.name,
			}),
			flags: MessageFlags.Ephemeral,
		});
	}
}
