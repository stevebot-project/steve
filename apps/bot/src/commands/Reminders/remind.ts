import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { Subcommand, SubcommandOptions } from "@sapphire/plugin-subcommands";
import { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<SubcommandOptions>({
	description: "Create, view, or cancel reminders.",
	subcommands: [
		{ name: "set", chatInputRun: "set" },
		{ name: "cancel", chatInputRun: "cancel" },
		{ name: "view", chatInputRun: "view" },
	],
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("set")
				.setDescription("Set a new reminder")
				.addStringOption((option) =>
					option
						.setName("content")
						.setDescription("What would you like your reminder to say?")
						.setRequired(true)
						.setMaxLength(140),
				)
				.addStringOption((option) =>
					option.setName("duration").setDescription("In how long should you get this reminder?").setRequired(true),
				),
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("cancel")
				.setDescription("Cancel a reminder")
				.addStringOption((option) =>
					option
						.setName("reminder")
						.setDescription("What reminder would you like to cancel?")
						.setRequired(true)
						.setAutocomplete(true),
				),
		)
		.addSubcommand((subcommand) => subcommand.setName("view").setDescription("View a list of your current reminders")),
)
export default class extends Subcommand {
	public async set(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const content = interaction.options.getString("content", true);

		const durationInput = interaction.options.getString("duration", true);
		const duration = this.container.utilities.time.parseDuration(durationInput);
		if (!duration) return interaction.editReply("duration error");

		const channelId = await this.parseReminderChannel(interaction);

		await this.container.settings.users.setReminder(content, channelId, interaction.user.id, duration);

		return interaction.editReply("success");
	}

	public async cancel(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();

		const cuid = interaction.options.getString("reminder", true);

		await this.container.settings.users.cancelReminder(cuid);

		return interaction.editReply("success");
	}

	// TODO: fix all this

	// public async view(interaction: ChatInputCommandInteraction) {
	// 	await interaction.deferReply();

	// 	const reminders: Reminder[] = await this.container.settings.users.getReminders(interaction.user.id);
	// 	const container = this.buildDisplayContainer(reminders);

	// 	return interaction.editReply({
	// 		components: [container],
	// 		flags: MessageFlags.IsComponentsV2,
	// 	});
	// }

	// private buildDisplayContainer(reminders: Reminder[]) {
	// 	const container = new ContainerBuilder().setAccentColor(0xadcb27);

	// 	if (reminders.length === 0) {
	// 		container.addTextDisplayComponents((builder) => builder.setContent("no reminders"));
	// 	}

	// 	if (reminders.length)
	// 		for (let i = 0; i < reminders.length; i++) {
	// 			const reminder = reminders[i];
	// 			const section = this.buildSection(reminder);

	// 			container.addSectionComponents(section);

	// 			if (reminders.length - i > 1) {
	// 				container.addSeparatorComponents((builder) => builder.setSpacing(SeparatorSpacingSize.Small));
	// 			}
	// 		}

	// 	return container;
	// }

	// private buildSection(reminder: Reminder) {
	// 	const section = new SectionBuilder().addTextDisplayComponents((builder) =>
	// 		builder.setContent(`**${reminder.content}**\n${this.getTimeUntilReminderSends(reminder)}`),
	// 	);

	// 	return section;
	// }

	// private getTimeUntilReminderSends(reminder: Reminder) {
	// 	const formatter = new DurationFormatter();
	// 	const timeUntil = reminder.sendAt.getTime() - Date.now();

	// 	return formatter.format(timeUntil, 2);
	// }

	private async parseReminderChannel(interaction: ChatInputCommandInteraction) {
		if (!interaction.channel) {
			const dmChannel = interaction.user.dmChannel ?? (await interaction.user.createDM());
			return dmChannel.id;
		}

		if (interaction.inCachedGuild()) {
			const guild = await this.container.settings.guilds.getGuild(interaction.guild.id);
			if (guild?.channelReminder) return guild.channelReminder;
		}

		return interaction.channelId;
	}
}
