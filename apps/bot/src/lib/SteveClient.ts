import { STEVE_CLIENT_OPTIONS } from "#lib/setup/config";
import { SapphireClient, container } from "@sapphire/framework";
import SettingsProvider from "./database/SettingsProvider.js";

export class SteveClient extends SapphireClient {
	public dev = process.env.NODE_ENV !== "production";

	public constructor() {
		super(STEVE_CLIENT_OPTIONS);
	}

	public override async login() {
		container.settings = new SettingsProvider();

		const token = this.dev ? process.env.DISCORD_TOKEN_DEV : process.env.DISCORD_TOKEN_PROD;

		return super.login(token);
	}
}
