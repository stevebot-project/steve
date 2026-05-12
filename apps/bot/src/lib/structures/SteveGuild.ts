import ModerationManager from "#lib/structures/moderation/ModerationManager";
import { container } from "@sapphire/framework";
import { Guild } from "discord.js";

export class SteveGuild {
	public readonly settings: Awaited<ReturnType<typeof container.settings.guilds.getGuild>>;

	public readonly moderation: ModerationManager;

	private constructor(
		settings: Awaited<ReturnType<typeof container.settings.guilds.getGuild>>,
		moderation: ModerationManager,
	) {
		this.settings = settings;
		this.moderation = moderation;
	}

	public static async get(guild: Guild) {
		const settings = await container.settings.guilds.getGuild(guild.id);
		const moderation = new ModerationManager(guild);

		return new SteveGuild(settings, moderation);
	}
}
