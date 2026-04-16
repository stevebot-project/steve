import { Listener } from "@sapphire/framework";
import { Guild } from "discord.js";

export default class extends Listener {
	public async run(guild: Guild) {
		await this.container.settings.guilds.deleteGuild(guild.id);
	}
}
