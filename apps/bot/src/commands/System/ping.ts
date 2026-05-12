import { LanguageKeys } from "#lib/i18n/index";
import {
	SteveCommand,
	SteveCommandOptions,
} from "#lib/structures/commands/SteveCommand";
import { SteveT } from "#utils/i18n";
import { ApplyOptions, RegisterChatInputCommand } from "@sapphire/decorators";
import type { ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<SteveCommandOptions>({
	description: "Run a connection test to Discord.",
	shouldDefer: true,
})
@RegisterChatInputCommand((builder, command) =>
	builder.setName(command.name).setDescription(command.description),
)
export default class extends SteveCommand {
	public override async slashRun(
		interaction: ChatInputCommandInteraction,
		t: SteveT,
	) {
		const reply = await interaction.fetchReply();

		const reply_content = t(LanguageKeys.Commands.System.PingSuccess, {
			latency: reply.createdTimestamp - interaction.createdTimestamp,
		});

		return interaction.editReply(reply_content);
	}
}
