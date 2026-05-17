import { Utility } from "@sapphire/plugin-utilities-store";
import { AuditLogEvent, Guild, GuildAuditLogsEntry, TextChannel } from "discord.js";

export class GuildLoggingUtility extends Utility {
	public fetchExecutor = async (guild: Guild, type: AuditLogEvent) => {
		const logs = await guild.fetchAuditLogs({ limit: 1, type });
		const entry = logs.entries.first()!;

		return entry.executor ? (entry.executor.username ?? "Unknown") : "Discord";
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

	public getExecutor = (entry: GuildAuditLogsEntry) => {
		return entry.executor ? (entry.executor.username ?? "Unknown") : "Discord";
	};
}

declare module "@sapphire/plugin-utilities-store" {
	export interface Utilities {
		logs: GuildLoggingUtility;
	}
}
