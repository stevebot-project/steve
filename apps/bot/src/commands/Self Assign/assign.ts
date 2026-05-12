import { LanguageKeys } from "#lib/i18n/index";
import { GuildSlashCommandInteraction, SteveCommand, SteveCommandOptions } from "#lib/structures/commands/SteveCommand";
import { SteveGuild } from "#lib/structures/SteveGuild";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { InteractionContextType } from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Assign roles to yourself using Steve",
	guildOnly: true,
	shouldDefer: true,
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.addStringOption((option) =>
			option.setName("role").setDescription("The role to assign.").setRequired(true).setAutocomplete(true),
		),
)
export default class extends SteveCommand {
	// TODO: role being above bot
	public override async slashRun(interaction: GuildSlashCommandInteraction, t: SteveT) {
		const roleName = interaction.options.getString("role", true);
		const role = interaction.guild.roles.cache.find(
			(r) => r.name.toLowerCase() === roleName.toLowerCase() || r.id === roleName,
		);

		if (!role) return interaction.editReply(t(LanguageKeys.Commands.Assign.ErrorRoleNotFound, { name: roleName }));

		const guild = await SteveGuild.get(interaction.guild);
		const assignableRoles = guild.settings!.roleAssignable;

		if (!assignableRoles.includes(role.id)) {
			return interaction.editReply(t(LanguageKeys.Commands.Assign.ErrorNotSelfAssignable, { name: role.name }));
		}

		if (interaction.member.roles.cache.has(role.id)) {
			await interaction.member.roles.remove(role);

			return interaction.editReply(t(LanguageKeys.Commands.Assign.SuccessRoleRemoved, { name: role.name }));
		}

		await interaction.member.roles.add(role);

		return interaction.editReply(t(LanguageKeys.Commands.Assign.SuccessRoleAssigned, { name: role.name }));
	}
}
