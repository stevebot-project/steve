import FeedbackSettings from "#lib/database/FeedbackSettings";
import type { Feedback, PrismaClient } from "@steve/database";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockCreate = vi.fn();

const mockPrisma = {
	feedback: {
		create: mockCreate,
	},
} as unknown as PrismaClient;

describe("FeedbackSettings", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("addFeedback", () => {
		const settings = new FeedbackSettings(mockPrisma);

		it("calls prisma.feedback.create with the correct data", async () => {
			const content = "steve loves molly forever";
			const timestamp = new Date("2018-07-10T00:00:00.000Z");

			const expected: Feedback = { id: 1, content, timestamp };
			mockCreate.mockResolvedValueOnce(expected);

			const result = await settings.addFeedback(content, timestamp);

			expect(mockCreate).toHaveBeenCalledExactlyOnceWith({
				data: { content, timestamp },
			});
			expect(result).toEqual(expected);
		});

		it("throws errors from prisma", async () => {
			mockCreate.mockRejectedValueOnce(new Error("false"));

			await expect(settings.addFeedback("steve loves ali forever", new Date())).rejects.toThrow("false");
		});
	});
});
