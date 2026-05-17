import { LanguageKeys } from "#lib/i18n/index";
import { GuildSlashCommandInteraction, SteveCommand, SteveCommandOptions } from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import { channelMention, ChannelType, InteractionContextType, PermissionFlagsBits } from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Set or unset this server's serverlog.",
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
				.setDescription("What channel would you like to use as the serverlog?")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildText),
		),
)
export default class extends SteveCommand {
	public override async slashRun(interaction: GuildSlashCommandInteraction, t: SteveT) {
		const channel = interaction.options.getChannel<ChannelType.GuildText>("channel", true);

		const serverlog = await this.container.settings.guilds.getServerlog(interaction.guild.id);
		if (serverlog && serverlog === channel.id) {
			return interaction.editReply(
				t(LanguageKeys.Commands.System.SetServerlogAlreadyExists, { mention: channelMention(serverlog) }),
			);
		}

		await this.container.settings.guilds.setServerlogChannel(interaction.guild.id, channel.id);

		return interaction.editReply(
			t(LanguageKeys.Commands.System.SetServerlogSuccess, { mention: channelMention(channel.id) }),
		);
	}
}
