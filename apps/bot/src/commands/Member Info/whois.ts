import { LanguageKeys } from "#lib/i18n/index";
import {
	GuildSlashCommandInteraction,
	GuildUserMenuCommandInteraction,
	SteveCommand,
	SteveCommandOptions,
} from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand, RegisterUserContextMenuCommand } from "@sapphire/decorators";
import { DurationFormatter } from "@sapphire/duration";
import { EmbedBuilder, GuildMember, InteractionContextType } from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Get basic information about a member of the server.",
	guildOnly: true,
	requiredClientPermissions: ["EmbedLinks"],
	shouldDefer: true,
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.addUserOption((option) =>
			option.setName("user").setDescription("The user you'd like to get information about.").setRequired(true),
		),
)
@RegisterUserContextMenuCommand((builder, command) =>
	builder.setName(command.name).setContexts(InteractionContextType.Guild),
)
export default class extends SteveCommand {
	public override async slashRun(interaction: GuildSlashCommandInteraction, t: SteveT) {
		const member = interaction.options.getMember("user");
		if (!member) return interaction.editReply(t(LanguageKeys.Commands.Info.WhoisErrorMemberNotFound));

		const embed = this.buildEmbed(t, member);

		return interaction.editReply({ embeds: [embed] });
	}

	public override async menuRun(interaction: GuildUserMenuCommandInteraction, t: SteveT) {
		if (!interaction.targetMember) return interaction.reply(t(LanguageKeys.Commands.Info.WhoisErrorMemberNotFound));

		const embed = this.buildEmbed(t, interaction.targetMember);

		return interaction.reply({ embeds: [embed] });
	}

	private buildEmbed(t: SteveT, member: GuildMember) {
		const formatter = new DurationFormatter();
		const { defaultDateFormat } = this.container.utilities.time;

		const accountCreatedDate = defaultDateFormat.display(member.user.createdTimestamp);
		const accountCreatedDuration = formatter.format(Date.now() - member.user.createdTimestamp, 1);

		const joinedGuildDate = defaultDateFormat.display(member.joinedTimestamp!);
		const joindGuildDuration = formatter.format(Date.now() - member.joinedTimestamp!, 1);

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
			.setAuthor({ name: member.user.username, iconURL: member.displayAvatarURL() })
			.setFooter({ text: t(LanguageKeys.Commands.Info.WhoisEmbedFooter, { id: member.id }) })
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
