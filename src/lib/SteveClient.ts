import { PrismaClient } from "@prisma/client";
import { SapphireClient, container } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";

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

		return super.login(token);
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		prisma: PrismaClient;
	}
}
