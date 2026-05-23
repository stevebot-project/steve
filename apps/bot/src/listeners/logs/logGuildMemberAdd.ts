import { LanguageKeys } from "#lib/i18n/index";
import { GuildLogColors } from "#lib/types/Enums";
import { useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { EmbedBuilder, GuildMember } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: "guildMemberAdd" })
export default class extends Listener {
	public async run(member: GuildMember) {
		const { fetchMemberlog } = this.container.utilities.logs;

		const memberlog = await fetchMemberlog(member.guild);
		if (!memberlog) return;

		const { friendlyDuration } = this.container.utilities.time;
		const accountCreatedTime = friendlyDuration(Date.now() - member.user.createdTimestamp, 1);

		const t = useT(await fetchT(member.guild));

		const embed = new EmbedBuilder()
			.addFields({
				name: t(LanguageKeys.Logs.GuildMember.EmbedMemberAddFieldName),
				value: t(LanguageKeys.Logs.GuildMember.EmbedMemberAddFieldValue, { duration: accountCreatedTime }),
			})
			.setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
			.setColor(GuildLogColors.TURQUOISE)
			.setFooter({ text: t(LanguageKeys.Logs.GuildMember.EmbedMemberIDFooter, { id: member.id }) })
			.setTimestamp();

		return memberlog.send({ embeds: [embed] });
	}
}
