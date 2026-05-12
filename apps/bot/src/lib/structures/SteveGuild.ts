import { container } from "@sapphire/framework";
import { Guild } from "discord.js";

export class SteveGuild {
	public readonly settings: Awaited<ReturnType<typeof container.settings.guilds.getGuild>>;

	private constructor(settings: Awaited<ReturnType<typeof container.settings.guilds.getGuild>>) {
		this.settings = settings;
	}

	public static async get(guild: Guild) {
		const settings = await container.settings.guilds.getGuild(guild.id);

		return new SteveGuild(settings);
	}
}
