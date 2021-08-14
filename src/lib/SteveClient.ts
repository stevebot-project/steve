import { SapphireClient } from "@sapphire/framework";
import { Intents } from "discord.js";

export class SteveClient extends SapphireClient {

	public production: boolean;

	// TODO: move client options to env/config
	public constructor() {
		super({
			intents: [
				Intents.FLAGS.DIRECT_MESSAGES,
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_BANS,
				Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_INVITES,
				Intents.FLAGS.GUILD_MESSAGES
			],
		});

		this.production = process.env.NODE_ENV === "production";
	}
}
