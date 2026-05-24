import { LanguageKeys } from "#lib/i18n/index";
import { GuildLogColors } from "#lib/types/Enums";
import { useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { AuditLogEvent, DMChannel, EmbedBuilder, NonThreadGuildBasedChannel } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: "channelDelete" })
export default class extends Listener {
	public async run(channel: DMChannel | NonThreadGuildBasedChannel) {
		if (channel instanceof DMChannel) return;

		const { fetchExecutor, fetchServerlog, parseChannelType } = this.container.utilities.logs;

		const serverlog = await fetchServerlog(channel.guild);
		if (!serverlog) return;

		const t = useT(await fetchT(channel.guild));

		const executor = await fetchExecutor(channel.guild, AuditLogEvent.ChannelDelete);
		const type = parseChannelType(channel.type, t);
		const title = channel.parent
			? t(LanguageKeys.Logs.Channel.Delete.Embed.Title.HasParent, {
					name: channel.name,
					parentName: channel.parent.name,
					type,
				})
			: t(LanguageKeys.Logs.Channel.Delete.Embed.Title.NoParent, { name: channel.name, type });

		const embed = new EmbedBuilder()
			.setAuthor({ name: executor.name, iconURL: executor.avatar })
			.setColor(GuildLogColors.PURPLE)
			.setFooter({ text: t(LanguageKeys.Logs.Channel.EmbedFooter, { id: channel.id }) })
			.setTimestamp()
			.setTitle(title);

		return serverlog.send({ embeds: [embed] });
	}
}
