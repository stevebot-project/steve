import { PrismaClient } from "#root/src/generated/prisma/client/client";
import FeedbackSettings from "./FeedbackSettings.js";
import GuildSettings from "./GuildSettings.js";

export default class SettingsProvider {
	public feedback: FeedbackSettings;
	public guilds: GuildSettings;

	private prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient();
		// @ts-expect-error 2345
		this.feedback = new FeedbackSettings(this.prisma);
		// @ts-expect-error 2345
		this.guilds = new GuildSettings(this.prisma);
	}
}
