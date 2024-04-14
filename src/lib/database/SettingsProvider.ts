import { PrismaClient } from "@prisma/client";
import GuildSettings from "./GuildSettings.js";
import FeedbackSettings from "./FeedbackSettings.js";

export default class SettingsProvider {
	public feedback: FeedbackSettings;
	public guilds: GuildSettings;

	private prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient();
		this.feedback = new FeedbackSettings(this.prisma);
		this.guilds = new GuildSettings(this.prisma);
	}
}
