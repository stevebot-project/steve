import { Utility } from "@sapphire/plugin-utilities-store";
import { AuditLogEvent, Guild, GuildAuditLogsEntry, TextChannel } from "discord.js";

export class GuildLoggingUtility extends Utility {
	public fetchExecutor = async (guild: Guild, type: AuditLogEvent) => {
		const entry = await this.fetchMostRecentAuditLog(guild, type);

		return this.getExecutorFromEntry(entry);
	};

	public fetchMemberlog = async (guild: Guild) => {
		const guildSettings = await this.container.settings.guilds.getGuild(guild.id);
		if (!guildSettings?.logEventGuildMemberUpdate) return null;

		const memberlogId = guildSettings.channelMemberlog;
		if (!memberlogId) return null;

		const memberlog = guild.channels.cache.get(memberlogId);
		if (!memberlog || !(memberlog instanceof TextChannel)) return null;

		return memberlog;
	};

	public fetchMostRecentAuditLog = async (guild: Guild, type: AuditLogEvent) => {
		const logs = await guild.fetchAuditLogs({ limit: 1, type });
		return logs.entries.first()!;
	};

	public getExecutorFromEntry = async (entry: GuildAuditLogsEntry) => {
		const executorUser = entry.executor
			? entry.executor.partial
				? await entry.executor.fetch()
				: entry.executor
			: null;
		const executor: AuditLogExecutor = executorUser
			? { name: executorUser.username, avatar: executorUser.displayAvatarURL() }
			: { name: "Discord", avatar: "https://cdn.discordapp.com/embed/avatars/0.png" };

		return executor;
	};
}

interface AuditLogExecutor {
	name: string;
	avatar: string;
}

declare module "@sapphire/plugin-utilities-store" {
	export interface Utilities {
		logs: GuildLoggingUtility;
	}
}
