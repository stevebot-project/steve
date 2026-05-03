import GuildSettings from "#lib/database/GuildSettings";
import type { Guild, PrismaClient } from "@steve/database";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockCreate = vi.fn();
const mockDelete = vi.fn();
const mockFindUnique = vi.fn();

const mockPrisma = {
	guild: {
		create: mockCreate,
		delete: mockDelete,
		findUnique: mockFindUnique,
	},
} as unknown as PrismaClient;

describe("GuildSettings", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const settings = new GuildSettings(mockPrisma);
	const mockSnowflake = "12345678987654321";
	const mockGuildResult: Guild = {
		id: mockSnowflake,
		channelMemberlog: null,
		channelServerlog: null,
		deletePinMessages: false,
		logEventChannelCreate: true,
		logEventChannelDelete: true,
		logEventChannelUpdate: true,
		logEventEmojiCreate: true,
		logEventEmojiDelete: true,
		logEventEmojiUpdate: true,
		logEventGuildBanAdd: true,
		logEventGuildBanRemove: true,
		logEventGuildMemberAdd: true,
		logEventGuildMemberRemove: true,
		logEventGuildMemberUpdate: true,
		logEventInviteCreate: true,
		logEventInviteDelete: true,
		logEventMessageDelete: true,
		logEventMessageDeleteBulk: true,
		logEventRoleCreate: true,
		logEventRoleDelete: true,
		logEventRoleUpdate: true,
		roleAdministrator: null,
		roleAssignable: [],
		roleModerator: null,
	};

	describe("createGuild", () => {
		it("calls prisma.guild.create with a snowflake", async () => {
			mockCreate.mockResolvedValueOnce(mockGuildResult);

			const result = await settings.createGuild(mockSnowflake);

			expect(mockCreate).toHaveBeenCalledExactlyOnceWith({
				data: { id: mockSnowflake },
			});
			expect(result).toEqual(mockGuildResult);
		});

		it("throws errors from prisma", async () => {
			mockCreate.mockRejectedValueOnce(new Error("error"));

			await expect(settings.createGuild(mockSnowflake)).rejects.toThrow(
				"error",
			);
		});
	});

	describe("deleteGuild", () => {
		it("calls prisma.guild.delete with a snowflake", async () => {
			mockDelete.mockResolvedValueOnce(mockGuildResult);

			const result = await settings.deleteGuild(mockSnowflake);

			expect(mockDelete).toHaveBeenCalledExactlyOnceWith({
				where: { id: mockSnowflake },
			});
			expect(result).toEqual(mockGuildResult);
		});

		it("throws errors from prisma", async () => {
			mockDelete.mockRejectedValueOnce(new Error("error"));

			await expect(settings.deleteGuild(mockSnowflake)).rejects.toThrow(
				"error",
			);
		});
	});

	describe("getGuild", () => {
		it("calls prisma.guild.findUnique with a snowflake", async () => {
			mockFindUnique.mockResolvedValueOnce(mockGuildResult);

			const result = await settings.getGuild(mockSnowflake);

			expect(mockFindUnique).toHaveBeenCalledExactlyOnceWith({
				where: { id: mockSnowflake },
			});
			expect(result).toEqual(mockGuildResult);
		});

		it("throws errors from prisma", async () => {
			mockFindUnique.mockRejectedValueOnce(new Error("error"));

			await expect(settings.getGuild(mockSnowflake)).rejects.toThrow("error");
		});
	});
});
