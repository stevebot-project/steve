import { LanguageKeys } from "#lib/i18n/index";
import { SteveT, useT } from "#utils/i18n";
import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { AuditLogEvent, EmbedBuilder, Guild, GuildMember, PartialGuildMember, TextChannel } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: "guildMemberUpdate" })
export default class extends Listener {
	public async run(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) {
		const { fetchMemberlog } = this.container.utilities.logs;
		const memberlog = await fetchMemberlog(newMember.guild);
		if (!memberlog) return;

		const t = useT(await fetchT(newMember.guild));

		if (oldMember.displayName !== newMember.displayName) {
			await this.logDisplayNameChange(newMember, memberlog, t);
		}

		if (!newMember.roles.cache.equals(oldMember.roles.cache)) {
			await this.logRoleChanges(newMember, memberlog, t);
		}
	}

	private async getRoleChangeInfo(guild: Guild): Promise<RoleChangeInfo[]> {
		const changes: RoleChangeInfo[] = [];
		const { fetchMostRecentAuditLog, getExecutorFromEntry } = this.container.utilities.logs;

		const entry = await fetchMostRecentAuditLog(guild, AuditLogEvent.MemberRoleUpdate);
		const executor = await getExecutorFromEntry(entry);

		for (const change of entry.changes) {
			if (change.key !== "$add" && change.key !== "$remove") continue;
			if (!change.new) continue;

			for (const roleData of change.new) {
				changes.push({
					executor: executor.name,
					roleName: roleData.name,
					type: change.key,
				});
			}
		}

		return changes;
	}

	private logDisplayNameChange(newMember: GuildMember, memberlog: TextChannel, t: SteveT) {
		const embed = new EmbedBuilder()
			.addFields({ name: t(LanguageKeys.Logs.GuildMember.EmbedDisplayNameField), value: newMember.displayName })
			.setAuthor({ name: newMember.user.username, iconURL: newMember.displayAvatarURL() })
			.setColor(0x61e3f9)
			.setFooter({ text: t(LanguageKeys.Logs.GuildMember.EmbedMemberIDFooter, { id: newMember.id }) })
			.setTimestamp();

		return memberlog.send({ embeds: [embed] });
	}

	private async logRoleChanges(member: GuildMember, memberlog: TextChannel, t: SteveT) {
		const embeds: EmbedBuilder[] = [];
		const changes = await this.getRoleChangeInfo(member.guild);

		for (const change of changes) {
			const embed = new EmbedBuilder()
				.setAuthor({ name: member.user.username, iconURL: member.displayAvatarURL() })
				.setColor(0x61e3f9)
				.setFooter({ text: t(LanguageKeys.Logs.GuildMember.EmbedMemberIDFooter, { id: member.id }) })
				.setTimestamp()
				.setTitle(
					change.type === "$add"
						? t(LanguageKeys.Logs.GuildMember.EmbedTitleRoleAdded, {
								role: change.roleName,
								executor: change.executor,
							})
						: t(LanguageKeys.Logs.GuildMember.EmbedTitleRoleRemoved, {
								role: change.roleName,
								executor: change.executor,
							}),
				);

			embeds.push(embed);
		}

		return memberlog.send({ embeds });
	}
}

interface RoleChangeInfo {
	executor: string;
	roleName: string;
	type: "$add" | "$remove";
}
