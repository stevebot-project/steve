import { ChatInputCommandDeniedPayload, Listener, UserError } from "@sapphire/framework";
import { MessageFlags } from "discord.js";

export default class extends Listener {
	public run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
		if (interaction.deferred || interaction.replied) {
			return interaction.editReply({ content: error.message });
		}

		return interaction.reply({ content: error.message, flags: MessageFlags.Ephemeral });
	}
}
