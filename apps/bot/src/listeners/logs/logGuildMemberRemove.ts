import { LanguageKeys } from "#lib/i18n/index";
import { GuildLogColors } from "#lib/types/Enums";
import { useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { EmbedBuilder, GuildMember } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: "guildMemberRemove" })
export default class extends Listener {
	public async run(member: GuildMember) {
		const { fetchMemberlog } = this.container.utilities.logs;

		const memberlog = await fetchMemberlog(member.guild);
		if (!memberlog) return;

		const t = useT(await fetchT(member.guild));

		const { friendlyDuration } = this.container.utilities.time;
		const duration = friendlyDuration(Date.now() - member.joinedTimestamp!, 1);

		const roles =
			member.roles.cache.size > 1
				? member.roles.cache
						.filter((r) => r.id !== member.guild.id)
						.map((r) => r.name)
						.join(", ")
				: t(LanguageKeys.Logs.GuildMember.Remove.Embed.RolesField.ValueNone);

		const embed = new EmbedBuilder()
			.addFields(
				{
					name: t(LanguageKeys.Logs.GuildMember.Remove.Embed.DurationField.Name),
					value: t(LanguageKeys.Logs.GuildMember.Remove.Embed.DurationField.Value, { duration }),
					inline: true,
				},
				{
					name: t(LanguageKeys.Logs.GuildMember.Remove.Embed.RolesField.Name),
					value: roles,
					inline: true,
				},
			)
			.setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
			.setColor(GuildLogColors.TURQUOISE)
			.setFooter({ text: t(LanguageKeys.Logs.GuildMember.EmbedFooter, { id: member.id }) })
			.setTimestamp();

		return memberlog.send({ embeds: [embed] });
	}
}
