import { SteveGuild } from "#lib/structures/SteveGuild";
import { ApplyOptions } from "@sapphire/decorators";
import { Subcommand } from "@sapphire/plugin-subcommands";
import {
	InteractionContextType,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";

@ApplyOptions<Subcommand.Options>({
	description: "Manage self-assignable roles.",
	subcommands: [
		{ name: "add", chatInputRun: "add" },
		{ name: "remove", chatInputRun: "remove" },
	],
})
export default class extends Subcommand {
	public override registerApplicationCommands(registry: Subcommand.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.setContexts(InteractionContextType.Guild)
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("add")
						.setDescription("Add a self-assignable role.")
						.addRoleOption((option) =>
							option
								.setName("role")
								.setDescription("The role to add.")
								.setRequired(true),
						),
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("remove")
						.setDescription("Set a role to no longer be self-assignable.")
						.addStringOption((option) =>
							option
								.setName("role")
								.setDescription("The role to remove.")
								.setRequired(true)
								.setAutocomplete(true),
						),
				),
		);
	}

	public async add(interaction: Subcommand.ChatInputCommandInteraction) {
		const role = interaction.options.getRole("role", true);
		const guild = await SteveGuild.get(interaction.guild!);

		const assignableRoles = guild.settings!.roleAssignable;

		if (assignableRoles.includes(role.id)) {
			return interaction.reply({
				content: "already self-assignable",
				flags: MessageFlags.Ephemeral,
			});
		}

		await this.container.settings.guilds.addAssignableRole(
			interaction.guildId!,
			role.id,
		);

		return interaction.reply({
			content: "role is now self-assignable",
			flags: MessageFlags.Ephemeral,
		});
	}

	public async remove(interaction: Subcommand.ChatInputCommandInteraction) {
		const roleName = interaction.options.getString("role", true);
		const guild = await SteveGuild.get(interaction.guild!);

		const role = interaction.guild!.roles.cache.find(
			(r) => r.name.toLowerCase() === roleName.toLowerCase(),
		);

		if (!role) {
			return interaction.reply({
				content: "role not found",
				flags: MessageFlags.Ephemeral,
			});
		}

		const assignableRoles = guild.settings!.roleAssignable;

		if (!assignableRoles.includes(role.id)) {
			return interaction.reply({
				content: "already not self-assignable",
				flags: MessageFlags.Ephemeral,
			});
		}

		await this.container.settings.guilds.removeAssignableRole(
			interaction.guildId!,
			role.id,
		);

		return interaction.reply({
			content: "role is no longer self-assignable",
			flags: MessageFlags.Ephemeral,
		});
	}

	public override async autocompleteRun(
		interaction: Subcommand.AutocompleteInteraction,
	) {
		const focusedValue = interaction.options.getFocused();
		const guild = await SteveGuild.get(interaction.guild!);

		const assignableRoles = guild.settings!.roleAssignable;

		const filtered = interaction
			.guild!.roles.cache.filter((r) => assignableRoles.includes(r.id))
			.filter((r) => r.name.toLowerCase().includes(focusedValue.toLowerCase()))
			.map((r) => ({ name: r.name, value: r.name }))
			.slice(0, 25);

		return interaction.respond(filtered);
	}
}
