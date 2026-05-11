import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { SteveGuild } from "#lib/structures/SteveGuild";
import { useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	InteractionContextType,
	MessageFlags,
} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Assign roles to yourself using Steve",
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
						.setName("role")
						.setDescription("The role to assign.")
						.setRequired(true)
						.setAutocomplete(true),
				),
		);
	}

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

	public override async autocompleteRun(
		interaction: AutocompleteInteraction<"cached">,
	) {
		const query = interaction.options.getFocused();
		const guild = await SteveGuild.get(interaction.guild);

		const assignableRoles = guild.settings!.roleAssignable;

		const response = interaction.guild.roles.cache
			.filter((r) => assignableRoles.includes(r.id))
			.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
			.map((r) => ({ name: r.name, value: r.name }))
			.slice(0, 25);

		return interaction.respond(response);
	}
}
