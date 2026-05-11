import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { useT } from "#utils/i18n";
import { defaultDateFormat } from "#utils/util";
import {
	ApplyOptions,
	RegisterChatInputCommand,
	RegisterUserContextMenuCommand,
} from "@sapphire/decorators";
import { DurationFormatter } from "@sapphire/duration";
import { type CommandOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import {
	EmbedBuilder,
	GuildMember,
	InteractionContextType,
	UserContextMenuCommandInteraction,
	type ChatInputCommandInteraction,
} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Get basic information about a member of the server.",
	requiredClientPermissions: ["EmbedLinks"],
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user you'd like to get information about.")
				.setRequired(true),
		),
)
@RegisterUserContextMenuCommand((builder, command) =>
	builder.setName(command.name).setContexts(InteractionContextType.Guild),
)
export default class extends SteveCommand {
	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.editReply(
				t(LanguageKeys.General.Errors.NotInCachedGuild),
			);
		}

		const member = interaction.options.getMember("user");

		const embed = this.buildEmbed(t, member!);

		return interaction.editReply({ embeds: [embed] });
	}

	public override async contextMenuRun(
		interaction: UserContextMenuCommandInteraction,
	) {
		await interaction.deferReply();
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}

		const embed = this.buildEmbed(t, interaction.targetMember!);

		return interaction.editReply({ embeds: [embed] });
	}

	private buildEmbed(t: ReturnType<typeof useT>, member: GuildMember) {
		const formatter = new DurationFormatter();

		const accountCreatedDate = defaultDateFormat.display(
			member.user.createdTimestamp,
		);
		const accountCreatedDuration = formatter.format(
			Date.now() - member.user.createdTimestamp,
			1,
		);

		const joinedGuildDate = defaultDateFormat.display(member.joinedTimestamp!);
		const joindGuildDuration = formatter.format(
			Date.now() - member.joinedTimestamp!,
			1,
		);

		const embed = new EmbedBuilder()
			.addFields(
				{
					name: t(LanguageKeys.Commands.Info.WhoisEmbedDisplayName),
					value: member.displayName,
					inline: true,
				},
				{
					name: t(LanguageKeys.Commands.Info.WhoisEmbedAccountCreated),
					value: t(LanguageKeys.Commands.Info.WhoisDate, {
						duration: accountCreatedDuration,
						date: accountCreatedDate,
					}),
					inline: true,
				},
				{
					name: t(LanguageKeys.Commands.Info.WhoisEmbedJoinedGuild),
					value: t(LanguageKeys.Commands.Info.WhoisDate, {
						duration: joindGuildDuration,
						date: joinedGuildDate,
					}),
					inline: true,
				},
			)
			.setAuthor({
				name: member.user.username,
				iconURL: member.displayAvatarURL(),
			})
			.setFooter({
				text: t(LanguageKeys.Commands.Info.WhoisEmbedFooter, {
					id: member.id,
				}),
			})
			.setTimestamp();

		if (member.roles.cache.size > 1) {
			embed.addFields([
				{
					name: t(LanguageKeys.Commands.Info.WhoisEmbedRoles),
					value: member.roles.cache
						.filter((r) => r.id !== member.guild.id)
						.sort()
						.map((r) => r)
						.join(" "),
				},
			]);
		}

		return embed;
	}
}
