import { SapphireClient, container } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import SettingsProvider from "./database/SettingsProvider.js";

export default class SteveClient extends SapphireClient {
	public constructor() {
		super({
			intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
			i18n: {
				// eslint-disable-next-line @typescript-eslint/require-await
				fetchLanguage: async () => {
					return "en-US";
				},
			},
		});
	}

	public override async login(token: string) {
		container.settings = new SettingsProvider();

		return super.login(token);
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		settings: SettingsProvider;
	}
}
