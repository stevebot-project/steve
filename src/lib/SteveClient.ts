import { PrismaClient } from "@prisma/client";
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
		// connect to database
		container.prisma = new PrismaClient();
		container.settings = new SettingsProvider(container.prisma);

		return super.login(token);
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		settings: SettingsProvider;
		prisma: PrismaClient;
	}
}
