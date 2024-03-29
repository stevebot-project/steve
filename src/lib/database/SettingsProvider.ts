import { PrismaClient } from "@prisma/client";
import GuildSettings from "./GuildSettings.js";

export default class SettingsProvider {
	public guilds: GuildSettings;

	private prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient();
		this.guilds = new GuildSettings(this.prisma);
	}
}
