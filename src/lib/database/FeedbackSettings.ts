import { PrismaClient } from "@prisma/client";
import { Snowflake } from "discord.js";

export default class FeedbackSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public addFeedback(
		content: string,
		timestamp: Date,
		userSnowflake: Snowflake,
	) {
		return this.prisma.feedback.create({
			data: {
				content,
				timestamp,
				user: userSnowflake,
			},
		});
	}
}
