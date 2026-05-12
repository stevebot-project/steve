import { PrismaClient } from "@steve/database";
import { Snowflake } from "discord.js";

export default class SnippetSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async createSnippet(guildId: Snowflake, name: string, content: string, embed: boolean) {
		return this.prisma.snippet.create({
			data: { guildId, name, content, embed },
		});
	}

	public async deleteSnippet(guildId: Snowflake, name: string) {
		return this.prisma.snippet.delete({
			where: { snippetId: { guildId, name } },
		});
	}

	public async editSnippet(guildId: Snowflake, name: string, content: string, embed: boolean) {
		return this.prisma.snippet.update({
			where: { snippetId: { guildId, name } },
			data: { content, embed },
		});
	}

	public async getGuildSnippets(guildId: Snowflake) {
		return this.prisma.snippet.findMany({
			where: { guildId },
		});
	}

	public async getSnippet(guildId: Snowflake, name: string) {
		return this.prisma.snippet.findUnique({
			where: { snippetId: { guildId, name } },
		});
	}

	public async searchSnippetsByName(guildId: Snowflake, query: string) {
		return this.prisma.snippet.findMany({
			where: {
				guildId,
				name: {
					contains: query,
					mode: "insensitive",
				},
			},
			select: { name: true },
			take: 25,
		});
	}
}
