import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { defaultDateFormat } from "#utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import { DurationFormatter } from "@sapphire/duration";
import { Command, type CommandOptions } from "@sapphire/framework";
import { type TFunction } from "@sapphire/plugin-i18next";
import { cast } from "@sapphire/utilities";
import {
	type ChatInputCommandInteraction,
	GuildMember,
	EmbedBuilder,
	ApplicationCommandType,
	UserContextMenuCommandInteraction,
} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Get basic information about a member of the server.",
	requiredClientPermissions: ["EmbedLinks"],
})
export default class extends SteveCommand {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user you'd like to get information about.")
						.setRequired(true),
				)
				.setDMPermission(false),
		);

		registry.registerContextMenuCommand((builder) =>
			builder.setName(this.name).setType(ApplicationCommandType.User),
		);
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		const t = await this.prehandle(interaction);
		const user = interaction.options.getUser("user");

		const embed = this.buildEmbed(
			t,
			await interaction.guild!.members.fetch(user!.id),
		);

		return interaction.editReply({ embeds: [embed] });
	}

	public override async contextMenuRun(
		interaction: UserContextMenuCommandInteraction,
	) {
		const t = await this.prehandle(interaction);
		const embed = this.buildEmbed(
			t,
			cast<GuildMember>(interaction.targetMember)!,
		);

		return interaction.editReply({ embeds: [embed] });
	}

	private buildEmbed(t: TFunction, member: GuildMember) {
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
					name: t("commands/whois:embed.fieldTitles.displayName"),
					value: member.displayName,
					inline: true,
				},
				{
					name: t("commands/whois:embed.fieldTitles.accountCreated"),
					value: t("commands/whois:date", {
						duration: accountCreatedDuration,
						date: accountCreatedDate,
					}),
					inline: true,
				},
				{
					name: t("commands/whois:embed.fieldTitles.joinedGuild"),
					value: t("commands/whois:date", {
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
				text: t("commands/whois:embed.footer", {
					id: member.id,
				}),
			})
			.setTimestamp();

		if (member.roles.cache.size > 1) {
			embed.addFields([
				{
					name: t("commands/whois:embed.fieldTitles.roles"),
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
