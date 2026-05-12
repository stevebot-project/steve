import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand, SteveCommandOptions } from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { Time } from "@sapphire/timestamp";
import {
	ActionRowBuilder,
	ChatInputCommandInteraction,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Send feedback to my developers.",
})
@RegisterChatInputCommand((builder, command) => builder.setName(command.name).setDescription(command.description))
export default class extends SteveCommand {
	public override async slashRun(interaction: ChatInputCommandInteraction, t: SteveT) {
		try {
			await this.sendFeedbackModal(interaction, t);

			const submissionData = await interaction.awaitModalSubmit({
				time: Time.Minute * 5,
			});

			const feedback = submissionData.fields.getTextInputValue("feedback_input");

			await this.container.settings.feedback.addFeedback(feedback, submissionData.createdAt);

			return submissionData.reply(t(LanguageKeys.Commands.System.FeedbackSubmissionSuccess));
		} catch (err) {
			this.container.logger.error(err);
			return interaction.reply(t(LanguageKeys.Commands.System.FeedbackSubmissionFailure));
		}
	}

	private sendFeedbackModal(interaction: ChatInputCommandInteraction, t: SteveT) {
		const input = new TextInputBuilder()
			.setCustomId("feedback_input")
			.setLabel(t(LanguageKeys.Commands.System.FeedbackModalInputLabel))
			.setMaxLength(1900)
			.setPlaceholder(t(LanguageKeys.Commands.System.FeedbackModalInputPlaceholder))
			.setRequired(true)
			.setStyle(TextInputStyle.Paragraph);

		const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(input);

		const modal = new ModalBuilder()
			.setCustomId("feedback_modal")
			.setTitle(t(LanguageKeys.Commands.System.FeedbackModalTitle))
			.addComponents(actionRow);

		return interaction.showModal(modal);
	}
}
