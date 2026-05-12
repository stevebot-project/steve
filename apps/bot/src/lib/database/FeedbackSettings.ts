import { Feedback, PrismaClient } from "@steve/database";

export default class FeedbackSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public addFeedback(content: string, timestamp: Date): Promise<Feedback | null> {
		return this.prisma.feedback.create({
			data: {
				content,
				timestamp,
			},
		});
	}
}
