import { LanguageKeys } from "#lib/i18n/index";
import { GuildSlashCommandInteraction, SteveCommand, SteveCommandOptions } from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { InteractionContextType, PermissionFlagsBits } from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Set a member's nickname.",
	guildOnly: true,
	requiredClientPermissions: [PermissionFlagsBits.ManageNicknames],
	shouldDefer: true,
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
		.addUserOption((option) =>
			option.setName("member").setDescription("The member whose nickname you would like to change").setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("nickname")
				.setDescription("The new nickname. Leave blank to reset the member's nickname.")
				.setRequired(false)
				.setMaxLength(32),
		),
)
export default class extends SteveCommand {
	public override async slashRun(interaction: GuildSlashCommandInteraction, t: SteveT) {
		const member = interaction.options.getMember("member");
		if (!member) return interaction.editReply(t(LanguageKeys.Commands.Moderation.ErrorUnknownMember));

		if (!member.manageable && member.user.id !== this.container.client.user!.id)
			return interaction.editReply(
				t(LanguageKeys.Commands.Moderation.ErrorNotManageable, { member: member.user.username }),
			);

		const nickname = interaction.options.getString("nickname");

		await member.setNickname(nickname);

		return interaction.editReply(
			nickname
				? t(LanguageKeys.Commands.Moderation.NicknameSuccess, { username: member.user.username, nickname })
				: t(LanguageKeys.Commands.Moderation.NicknameReset, { username: member.user.username }),
		);
	}
}
