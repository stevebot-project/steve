import { Guild, PrismaClient } from "@steve/database";
import { Snowflake } from "discord.js";

export default class GuildSettings {
	private prisma: PrismaClient;

	public constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async addAssignableRole(guildSnowflake: Snowflake, roleSnowflake: Snowflake) {
		return this.prisma.guild.update({
			where: { id: guildSnowflake },
			data: {
				roleAssignable: {
					push: roleSnowflake,
				},
			},
		});
	}

	public async createGuild(guildSnowflake: Snowflake): Promise<Guild | null> {
		return this.prisma.guild.create({
			data: { id: guildSnowflake },
		});
	}

	public async deleteGuild(guildSnowflake: Snowflake): Promise<Guild | null> {
		return this.prisma.guild.delete({
			where: { id: guildSnowflake },
		});
	}

	public async getAssignableRoles(guildSnowflake: Snowflake) {
		return this.prisma.guild.findUnique({
			where: { id: guildSnowflake },
			select: { roleAssignable: true },
		});
	}

	public async getGuild(guildSnowflake: Snowflake) {
		return this.prisma.guild.findUnique({
			where: { id: guildSnowflake },
		});
	}

	public async getMemberlog(guildSnowflake: Snowflake) {
		const result = await this.prisma.guild.findUnique({
			where: { id: guildSnowflake },
			select: { channelMemberlog: true },
		});

		return result ? result.channelMemberlog : null;
	}

	public async getServerlog(guildSnowflake: Snowflake) {
		const result = await this.prisma.guild.findUnique({
			where: { id: guildSnowflake },
			select: { channelServerlog: true },
		});

		return result ? result.channelServerlog : null;
	}

	public async removeAssignableRole(guildSnowflake: Snowflake, roleSnowflake: Snowflake) {
		const guild = await this.prisma.guild.findUnique({
			where: { id: guildSnowflake },
			select: { roleAssignable: true },
		});

		if (!guild) return null;

		return this.prisma.guild.update({
			where: { id: guildSnowflake },
			data: {
				roleAssignable: guild.roleAssignable.filter((r) => r !== roleSnowflake),
			},
		});
	}

	public async setMemberlogChannel(guildSnowflake: Snowflake, channelSnowflake: Snowflake) {
		return this.prisma.guild.update({
			where: { id: guildSnowflake },
			data: {
				channelMemberlog: channelSnowflake,
			},
		});
	}

	public async setServerlogChannel(guildSnowflake: Snowflake, channelSnowflake: Snowflake) {
		return this.prisma.guild.update({
			where: { id: guildSnowflake },
			data: {
				channelServerlog: channelSnowflake,
			},
		});
	}
}
