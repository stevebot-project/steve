import { Guild, PrismaClient } from "@steve/database";
import { Snowflake } from "discord.js";

export default class GuildSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async createGuild(guildSnowflake: Snowflake): Promise<Guild | null> {
		return this.prisma.guild.create({
			data: { id: guildSnowflake },
		});
	}

	public async deleteGuild(guildSnowflake: Snowflake): Promise<Guild | null> {
		return this.prisma.guild.delete({
			where: { id: guildSnowflake },
		});
	}

	public async getGuild(guildSnowflake: Snowflake) {
		return this.prisma.guild.findUnique({
			where: { id: guildSnowflake },
		});
	}
}
