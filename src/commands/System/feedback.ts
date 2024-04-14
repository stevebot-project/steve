import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { registerBasicCommand } from "#utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import {
	ApplicationCommandRegistry,
	CommandOptions,
} from "@sapphire/framework";
import { TFunction, fetchT } from "@sapphire/plugin-i18next";
import { Time } from "@sapphire/timestamp";
import {
	ActionRowBuilder,
	ChatInputCommandInteraction,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Send feedback to my developers.",
})
export default class extends SteveCommand {
	public override registerApplicationCommands(
		registry: ApplicationCommandRegistry,
	) {
		registerBasicCommand(registry, this.name, this.description);
	}

	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		const t = await fetchT(interaction);

		try {
			await this.sendFeedbackModal(interaction, t);

			const submissionData = await interaction.awaitModalSubmit({
				time: Time.Minute * 5,
			});

			const feedback =
				submissionData.fields.getTextInputValue("feedback_input");

			await this.container.settings.feedback.addFeedback(
				feedback,
				submissionData.createdAt,
				submissionData.user.id,
			);

			return submissionData.reply(t("commands/feedback:submissionSuccess"));
		} catch (e) {
			console.log(e); // TODO: set up logger plugin
			return interaction.reply(t("commands/feedback:submissionFailure"));
		}
	}

	private sendFeedbackModal(
		interaction: ChatInputCommandInteraction,
		t: TFunction,
	) {
		const input = new TextInputBuilder()
			.setCustomId("feedback_input")
			.setLabel(t("commands/feedback:modal.input.label"))
			.setMaxLength(1900)
			.setPlaceholder(t("commands/feedback:modal.input.placeholder"))
			.setRequired(true)
			.setStyle(TextInputStyle.Paragraph);

		const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
			input,
		);

		const modal = new ModalBuilder()
			.setCustomId("feedback_modal")
			.setTitle(t("commands/feedback:modal.title"))
			.addComponents(actionRow);

		return interaction.showModal(modal);
	}
}
