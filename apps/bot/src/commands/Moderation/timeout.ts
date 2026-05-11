import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { ModerationErrors } from "#lib/structures/moderation/ModerationManager";
import { SteveGuild } from "#lib/structures/SteveGuild";
import { useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import { Duration, DurationFormatter } from "@sapphire/duration";
import {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { Time } from "@sapphire/timestamp";
import {
	ChatInputCommandInteraction,
	InteractionContextType,
	PermissionFlagsBits,
} from "discord.js";

@ApplyOptions<CommandOptions>({
	description:
		"Timeout a specified member. A duration for the timeout, as well as a reason, can be provided.",
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
				.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
				.addUserOption((option) =>
					option
						.setName("target")
						.setDescription("The member you'd like to timeout.")
						.setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName("duration")
						.setDescription(
							"How long would you like this member to be in timeout? The maximum is 28 days.",
						)
						.setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName("reason")
						.setDescription("Why are you putting this member in timeout?")
						.setRequired(false),
				),
		);
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const t = useT(await fetchT(interaction));

		if (!interaction.inCachedGuild()) {
			return interaction.reply(t(LanguageKeys.General.Errors.NotInCachedGuild));
		}
		const guild = await SteveGuild.get(interaction.guild);

		const target = interaction.options.getMember("target");
		if (!target) {
			return interaction.editReply(
				t(LanguageKeys.Commands.Moderation.ErrorUnknownMember),
			);
		}

		const duration = this.parseDuration(
			interaction.options.getString("duration")!,
		);
		if (!duration) {
			return interaction.editReply(
				t(LanguageKeys.Commands.Moderation.ErrorInvalidDuration, {
					input: interaction.options.getString("duration")!,
				}),
			);
		}

		if (duration > Time.Day * 28) {
			return interaction.editReply(
				t(LanguageKeys.Commands.Moderation.TimeoutErrorMaxDuration),
			);
		}

		// GuildMember.timeout (called in guild.moderation.timeout) expects string | undefined for reason
		const reason = interaction.options.getString("reason") ?? undefined;

		const result = await guild.moderation.timeout(target, { duration, reason });

		if (result.success) {
			const formatter = new DurationFormatter();
			return interaction.editReply(
				t(LanguageKeys.Commands.Moderation.TimeoutSuccess, {
					member: target.user.username,
					duration: formatter.format(duration, 2),
				}),
			);
		}

		switch (result.error) {
			case ModerationErrors.GENERIC_FAIL:
				return interaction.editReply(
					t(LanguageKeys.Commands.Moderation.ErrorGenericFail, {
						member: target.user.username,
					}),
				);
			case ModerationErrors.NOT_MODERATABLE:
				return interaction.editReply(
					t(LanguageKeys.Commands.Moderation.ErrorNotModeratable, {
						member: target.user.username,
					}),
				);
		}
	}

	private parseDuration(input: string) {
		try {
			return new Duration(input).offset;
		} catch {
			return null;
		}
	}
}
