import { PrismaClient } from "@prisma/client";
import { Snowflake } from "discord.js";

export default class GuildSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public createGuild(guildSnowflake: Snowflake) {
		return this.prisma.guild.create({
			data: { id_: guildSnowflake, logEvents: {} },
		});
	}

	public deleteGuild(guildSnowflake: Snowflake) {
		return this.prisma.guild.delete({
			where: { id_: guildSnowflake },
		});
	}
}
