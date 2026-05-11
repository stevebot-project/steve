import { LanguageKeys } from "#lib/i18n/index";
import { SteveCommand } from "#lib/structures/commands/SteveCommand";
import { useT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import type { CommandOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import type { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "Run a connection test to Discord.",
})
@RegisterChatInputCommand((builder, command) =>
	builder.setName(command.name).setDescription(command.description),
)
export default class extends SteveCommand {
	public override async chatInputRun(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const t = useT(await fetchT(interaction));
		const reply = await interaction.fetchReply();

		const reply_content = t(LanguageKeys.Commands.System.PingSuccess, {
			latency: reply.createdTimestamp - interaction.createdTimestamp,
		});

		return interaction.editReply(reply_content);
	}
}
