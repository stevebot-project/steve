import { LanguageKeys } from "#lib/i18n/index";
import { GuildSlashCommandInteraction, SteveCommand, SteveCommandOptions } from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { DurationFormatter } from "@sapphire/duration";
import { Time } from "@sapphire/timestamp";
import { InteractionContextType, PermissionFlagsBits } from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Timeout a specified member. A duration for the timeout, as well as a reason, can be provided.",
	guildOnly: true,
	shouldDefer: true,
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addUserOption((option) =>
			option.setName("target").setDescription("The member you'd like to timeout.").setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("duration")
				.setDescription("How long would you like this member to be in timeout? The maximum is 28 days.")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName("reason").setDescription("Why are you putting this member in timeout?").setRequired(false),
		),
)
export default class extends SteveCommand {
	public override async slashRun(interaction: GuildSlashCommandInteraction, t: SteveT) {
		const target = interaction.options.getMember("target");
		if (!target) return interaction.editReply(t(LanguageKeys.Commands.Moderation.ErrorUnknownMember));

		if (!target.moderatable)
			return interaction.editReply(
				t(LanguageKeys.Commands.Moderation.ErrorNotModeratable, { member: target.user.username }),
			);

		const duration = this.container.utilities.time.parseDuration(interaction.options.getString("duration")!);
		if (!duration) {
			return interaction.editReply(
				t(LanguageKeys.Commands.Moderation.ErrorInvalidDuration, { input: interaction.options.getString("duration")! }),
			);
		}

		if (duration > Time.Day * 28) {
			return interaction.editReply(t(LanguageKeys.Commands.Moderation.TimeoutErrorMaxDuration));
		}

		const reason = interaction.options.getString("reason") ?? undefined;

		try {
			await target.timeout(duration, reason);
		} catch {
			return interaction.editReply(
				t(LanguageKeys.Commands.Moderation.ErrorGenericFail, { member: target.user.username }),
			);
		}

		return interaction.editReply(
			t(LanguageKeys.Commands.Moderation.TimeoutSuccess, {
				member: target.user.username,
				duration: new DurationFormatter().format(duration, 2),
			}),
		);
	}
}
