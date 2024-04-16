import { LogLevel } from "@sapphire/framework";
import { ClientOptions, GatewayIntentBits } from "discord.js";

function setInternationalizationOptions() {
	return {
		// eslint-disable-next-line @typescript-eslint/require-await
		fetchLanguage: async () => {
			return "en-US";
		},
	};
}

function setLoggerLevel() {
	return process.env.NODE_ENV === "production" ? LogLevel.Info : LogLevel.Debug;
}

export const STEVE_CLIENT_OPTIONS: ClientOptions = {
	i18n: setInternationalizationOptions(),
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
	logger: { level: setLoggerLevel() },
};
