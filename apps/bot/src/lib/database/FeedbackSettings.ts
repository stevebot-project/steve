import { PrismaClient } from "@prisma/client";

export default class FeedbackSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public addFeedback(content: string, timestamp: Date) {
		return this.prisma.feedback.create({
			data: {
				content,
				timestamp,
			},
		});
	}
}
