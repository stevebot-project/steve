import { LanguageKeys } from "#lib/i18n/index";
import { GuildSlashCommandInteraction, SteveCommand, SteveCommandOptions } from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { channelMention, ChannelType, InteractionContextType, PermissionFlagsBits } from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Set or unset this server's memberlog.",
	guildOnly: true,
	shouldDefer: true,
})
@RegisterChatInputCommand((builder, command) =>
	builder
		.setName(command.name)
		.setDescription(command.description)
		.setContexts(InteractionContextType.Guild)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("What channel would you like to use as the memberlog?")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText),
		),
)
export default class extends SteveCommand {
	public override async slashRun(interaction: GuildSlashCommandInteraction, t: SteveT) {
		const channel = interaction.options.getChannel<ChannelType.GuildText>("channel", true);

		const memberlog = await this.container.settings.guilds.getMemberlog(interaction.guild.id);
		if (memberlog && memberlog === channel.id) {
			return interaction.editReply(
				t(LanguageKeys.Commands.System.SetMemberlogAlreadyExists, { mention: channelMention(memberlog) }),
			);
		}

		await this.container.settings.guilds.setMemberlogChannel(interaction.guild.id, channel.id);

		return interaction.editReply(
			t(LanguageKeys.Commands.System.SetMemberlogSuccess, { mention: channelMention(channel.id) }),
		);
	}
}
