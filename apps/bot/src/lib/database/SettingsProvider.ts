import { PrismaClient } from "@steve/database";
import FeedbackSettings from "./FeedbackSettings.js";
import GuildSettings from "./GuildSettings.js";
import SnippetSettings from "./SnippetSettings.js";

export default class SettingsProvider {
	public feedback: FeedbackSettings;
	public guilds: GuildSettings;
	public snippets: SnippetSettings;

	private prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient();
		this.feedback = new FeedbackSettings(this.prisma);
		this.guilds = new GuildSettings(this.prisma);
		this.snippets = new SnippetSettings(this.prisma);
	}
}
