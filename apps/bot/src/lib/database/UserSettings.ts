import { PrismaClient } from "@steve/database";
import { Snowflake } from "discord.js";

export default class UserSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async cancelReminder(id: string) {
		return this.prisma.reminder.delete({
			where: { id },
		});
	}

	public async getReminders(userId: Snowflake) {
		return this.prisma.reminder.findMany({
			where: { userId },
		});
	}

	public async searchRemindersByContent(userId: Snowflake, query: string) {
		return this.prisma.reminder.findMany({
			where: {
				userId,
				content: {
					startsWith: query,
				},
			},
			select: { id: true, content: true },
		});
	}

	public async setReminder(content: string, channelId: Snowflake, userId: Snowflake, duration: number) {
		const sendAt = Date.now() + duration;
		return this.prisma.reminder.create({
			data: {
				channelId,
				content,
				sendAt: new Date(sendAt),
				user: { connectOrCreate: { where: { id: userId }, create: { id: userId } } },
			},
		});
	}
}
