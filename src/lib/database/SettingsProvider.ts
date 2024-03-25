import { PrismaClient } from "@prisma/client";
import GuildSettings from "./GuildSettings.js";

export default class SettingsProvider {
	public guilds: GuildSettings;

	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.guilds = new GuildSettings(prisma);
		this.prisma = prisma;
	}
}
