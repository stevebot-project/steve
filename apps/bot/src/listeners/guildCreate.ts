import { Listener } from "@sapphire/framework";
import { Guild } from "discord.js";

export default class extends Listener {
	public async run(guild: Guild): Promise<void> {
		await this.container.settings.guilds.createGuild(guild.id);
	}
}
