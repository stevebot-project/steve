import { LanguageKeys } from "#lib/i18n/index";
import { SteveT, TypedT } from "#utils/i18n";
import { Utility } from "@sapphire/plugin-utilities-store";
import { AuditLogEvent, ChannelType, Guild, GuildAuditLogsEntry, GuildChannelType, TextChannel } from "discord.js";

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

	public fetchServerlog = async (guild: Guild) => {
		const guildSettings = await this.container.settings.guilds.getGuild(guild.id);
		if (!guildSettings?.logEventGuildMemberUpdate) return null;

		const serverlogId = guildSettings.channelServerlog;
		if (!serverlogId) return null;

		const serverlog = guild.channels.cache.get(serverlogId);
		if (!serverlog || !(serverlog instanceof TextChannel)) return null;

		return serverlog;
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

	public parseChannelType = (type: GuildChannelType, t: SteveT) => {
		const CHANNEL_TYPE_KEYS: Partial<Record<ChannelType, TypedT>> = {
			[ChannelType.GuildAnnouncement]: LanguageKeys.Logs.Channel.Type.Announcement,
			[ChannelType.AnnouncementThread]: LanguageKeys.Logs.Channel.Type.AnnouncementThread,
			[ChannelType.GuildCategory]: LanguageKeys.Logs.Channel.Type.Category,
			[ChannelType.GuildForum]: LanguageKeys.Logs.Channel.Type.Forum,
			[ChannelType.GuildMedia]: LanguageKeys.Logs.Channel.Type.Media,
			[ChannelType.PrivateThread]: LanguageKeys.Logs.Channel.Type.PrivateThread,
			[ChannelType.PublicThread]: LanguageKeys.Logs.Channel.Type.PublicThread,
			[ChannelType.GuildStageVoice]: LanguageKeys.Logs.Channel.Type.StageVoice,
			[ChannelType.GuildText]: LanguageKeys.Logs.Channel.Type.Text,
			[ChannelType.GuildVoice]: LanguageKeys.Logs.Channel.Type.Voice,
		};

		const key = CHANNEL_TYPE_KEYS[type];

		return key ? t(key) : t(LanguageKeys.Logs.Channel.Type.Unknown);
	};
}

interface AuditLogExecutor {
	name: string;
	avatar: string;
}
