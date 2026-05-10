import SnippetSettings from "#lib/database/SnippetSettings";
import { PrismaClient, Snippet } from "@steve/database";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockCreate = vi.fn();
const mockDelete = vi.fn();
const mockFindMany = vi.fn();
const mockFindUnique = vi.fn();
const mockUpdate = vi.fn();

const mockPrisma = {
	snippet: {
		create: mockCreate,
		delete: mockDelete,
		findMany: mockFindMany,
		findUnique: mockFindUnique,
		update: mockUpdate,
	},
} as unknown as PrismaClient;

describe("SnippetSettings", () => {
	const settings = new SnippetSettings(mockPrisma);
	const mockGuildId = "12345678987654321";
	const mockSnippetResult: Snippet = {
		name: "test",
		content: "testcontent",
		embed: false,
		guildId: mockGuildId,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("createSnippet", () => {
		it("calls prisma.snippet.create with the correct data", async () => {
			mockCreate.mockResolvedValueOnce(mockSnippetResult);

			const result = await settings.createSnippet(
				mockGuildId,
				"test",
				"testcontent",
				false,
			);

			expect(mockCreate).toHaveBeenCalledExactlyOnceWith({
				data: {
					guildId: mockGuildId,
					name: "test",
					content: "testcontent",
					embed: false,
				},
			});

			expect(result).toEqual(mockSnippetResult);
		});

		it("throws errors from prisma", async () => {
			mockCreate.mockRejectedValueOnce(new Error("error"));

			await expect(
				settings.createSnippet(mockGuildId, "test", "testcontent", false),
			).rejects.toThrow("error");
		});
	});

	describe("deleteSnippet", () => {
		it("calls prisma.snippet.delete with a guild snowflake and snippet name", async () => {
			mockDelete.mockResolvedValueOnce(mockSnippetResult);

			const result = await settings.deleteSnippet(mockGuildId, "test");

			expect(mockDelete).toHaveBeenCalledExactlyOnceWith({
				where: {
					snippetId: {
						guildId: mockGuildId,
						name: "test",
					},
				},
			});

			expect(result).toEqual(mockSnippetResult);
		});

		it("throws errors from prisma", async () => {
			mockDelete.mockRejectedValueOnce(new Error("error"));

			await expect(settings.deleteSnippet(mockGuildId, "test")).rejects.toThrow(
				"error",
			);
		});
	});

	describe("editSnippet", () => {
		it("calls prisma.snippet.update with the correct where clause and data", async () => {
			const edited = {
				...mockSnippetResult,
				content: "newcontent",
				embed: true,
			};
			mockUpdate.mockResolvedValueOnce(edited);

			const result = await settings.editSnippet(
				mockGuildId,
				"test",
				"newcontent",
				true,
			);

			expect(mockUpdate).toHaveBeenCalledExactlyOnceWith({
				where: {
					snippetId: {
						guildId: mockGuildId,
						name: "test",
					},
				},
				data: {
					content: "newcontent",
					embed: true,
				},
			});

			expect(result).toEqual(edited);
		});

		it("throws errors from prisma", async () => {
			mockUpdate.mockRejectedValueOnce(new Error("error"));

			await expect(
				settings.editSnippet(mockGuildId, "test", "newcontent", true),
			).rejects.toThrow("error");
		});
	});

	describe("getGuildSnippets", () => {
		it("calls prisma.snippet.findMany with a guild snowflake", async () => {
			mockFindMany.mockResolvedValueOnce([mockSnippetResult]);

			const result = await settings.getGuildSnippets(mockGuildId);

			expect(mockFindMany).toHaveBeenCalledExactlyOnceWith({
				where: { guildId: mockGuildId },
			});

			expect(result).toEqual([mockSnippetResult]);
		});

		it("returns an empty array when the guild has no snippets", async () => {
			mockFindMany.mockResolvedValueOnce([]);

			const result = await settings.getGuildSnippets(mockGuildId);

			expect(result).toEqual([]);
		});

		it("throws errors from prisma", async () => {
			mockFindMany.mockRejectedValueOnce(new Error("error"));

			await expect(settings.getGuildSnippets(mockGuildId)).rejects.toThrow(
				"error",
			);
		});
	});

	describe("getSnippet", () => {
		it("calls prisma.snippet.findUnique with the snippetId unique constraint", async () => {
			mockFindUnique.mockResolvedValueOnce(mockSnippetResult);

			const result = await settings.getSnippet(mockGuildId, "test");

			expect(mockFindUnique).toHaveBeenCalledExactlyOnceWith({
				where: {
					snippetId: {
						guildId: mockGuildId,
						name: "test",
					},
				},
			});

			expect(result).toEqual(mockSnippetResult);
		});

		it("returns null when the snippet does not exist", async () => {
			mockFindUnique.mockResolvedValueOnce(null);

			const result = await settings.getSnippet(mockGuildId, "test");

			expect(result).toBeNull();
		});

		it("throws errors from prisma", async () => {
			mockFindUnique.mockRejectedValueOnce(new Error("error"));

			await expect(settings.getSnippet(mockGuildId, "test")).rejects.toThrow(
				"error",
			);
		});
	});

	describe("searchSnippetsByName", () => {
		it("calls prisma.snippet.findMany with a name filter and guild snowflake", async () => {
			mockFindMany.mockResolvedValueOnce([mockSnippetResult]);

			const result = await settings.searchSnippetsByName(mockGuildId, "te");

			expect(mockFindMany).toHaveBeenCalledExactlyOnceWith({
				where: {
					guildId: mockGuildId,
					name: { contains: "te", mode: "insensitive" },
				},
			});

			expect(result).toEqual([mockSnippetResult]);
		});

		it("returns an empty array when no snippets match the search", async () => {
			mockFindMany.mockResolvedValueOnce([]);

			const result = await settings.searchSnippetsByName(mockGuildId, "te");

			expect(result).toEqual([]);
		});

		it("throws errors from prisma", async () => {
			mockFindMany.mockRejectedValueOnce(new Error("error"));

			await expect(
				settings.searchSnippetsByName(mockGuildId, "te"),
			).rejects.toThrow("error");
		});
	});
});
