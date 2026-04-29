import { PrismaClient } from "@steve/database";
import { Snowflake } from "discord.js";

export default class SnippetSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async deleteSnippet(guildId: Snowflake, name: string) {
		return this.prisma.snippet.delete({
			where: { snippetId: { guildId, name } },
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

	// prisma upsert lets us use one method for creating and updating snippets
	public async updateSnippet(
		guildId: Snowflake,
		name: string,
		content: string,
		embed: boolean,
	) {
		return this.prisma.snippet.upsert({
			where: { snippetId: { guildId, name } },
			create: { guildId, name, content, embed },
			update: { name, content, embed },
		});
	}
}
