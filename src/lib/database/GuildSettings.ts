import { PrismaClient } from "@prisma/client";

export default class GuildSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
}
