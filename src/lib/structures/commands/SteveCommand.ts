import { Command } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import type { CommandInteraction } from "discord.js";

export abstract class SteveCommand extends Command {
	public async prehandle(interaction: CommandInteraction) {
		await interaction.deferReply();
		return fetchT(interaction);
	}
}
