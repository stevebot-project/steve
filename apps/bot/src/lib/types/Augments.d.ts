import { SettingsProvider } from "#lib/database/SettingsProvider";
import { GuildLoggingUtility, TimeUtility } from "../../utilities/logs";

declare module "@sapphire/framework" {
	interface Preconditions {
		isOwner: never;
	}
}

declare module "@sapphire/pieces" {
	interface Container {
		settings: SettingsProvider;
	}
}

declare module "@sapphire/plugin-utilities-store" {
	export interface Utilities {
		time: TimeUtility;
		logs: GuildLoggingUtility;
	}
}
