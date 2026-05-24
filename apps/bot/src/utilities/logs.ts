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
			[ChannelType.GuildText]: LanguageKeys.Logs.Channel.TypeText,
			[ChannelType.GuildVoice]: LanguageKeys.Logs.Channel.TypeVoice,
			[ChannelType.GuildCategory]: LanguageKeys.Logs.Channel.TypeCategory,
			[ChannelType.GuildAnnouncement]: LanguageKeys.Logs.Channel.TypeAnnouncement,
			[ChannelType.AnnouncementThread]: LanguageKeys.Logs.Channel.TypeAnnouncementThread,
			[ChannelType.PublicThread]: LanguageKeys.Logs.Channel.TypePublicThread,
			[ChannelType.PrivateThread]: LanguageKeys.Logs.Channel.TypePrivateThread,
			[ChannelType.GuildStageVoice]: LanguageKeys.Logs.Channel.TypeStageVoice,
			[ChannelType.GuildForum]: LanguageKeys.Logs.Channel.TypeForum,
			[ChannelType.GuildMedia]: LanguageKeys.Logs.Channel.TypeMedia,
		};

		const key = CHANNEL_TYPE_KEYS[type];

		return key ? t(key) : t(LanguageKeys.Logs.Channel.TypeUnknown);
	};
}

interface AuditLogExecutor {
	name: string;
	avatar: string;
}
