import { Event } from 'klasa';
import { GuildMember, TextChannel, Role, Guild, Message, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, getExecutor } from '@utils/util';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(oldMember: GuildMember, newMember: GuildMember): void {
		if (newMember.guild.settings.get(GuildSettings.LogEvents.GuildMemberUpdate) as boolean) {
			const memberlog = newMember.guild.channels.cache.get(newMember.guild.settings.get(GuildSettings.Channels.Memberlog));

			if (memberlog && memberlog.isGuildTextChannel()) {
				// eslint-disable-next-line max-len
				if (oldMember.displayName !== newMember.displayName) floatPromise(this, this.logDisplayNameChange(oldMember, newMember, memberlog));
				// eslint-disable-next-line max-len
				if (!oldMember.roles.cache.equals(newMember.roles.cache)) floatPromise(this, this.logRoleUpdate(oldMember, newMember, memberlog));
			}
		}

		if (!oldMember.roles.cache.equals(newMember.roles.cache)) floatPromise(this, this.handleTrustedRole(oldMember, newMember));
	}

	private async logDisplayNameChange(oldMember: GuildMember, newMember: GuildMember, memberlog: TextChannel): Promise<Message> {
		const embedData = newMember.guild.language.tget('eventGuildMemberUpdateDisplayNameChangeEmbed');

		const embed = new MessageEmbed()
			.addFields(
				{ name: embedData.fieldTitles.newDisplayName, value: newMember.displayName }
			)
			.setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
			.setColor(LogColors.TURQUOISE)
			.setFooter(embedData.footer(newMember.id))
			.setTimestamp();

		return memberlog.send(embed);
	}

	private async logRoleUpdate(oldMember: GuildMember, newMember: GuildMember, memberlog: TextChannel): Promise<Message> {
		const roleUpdateType = oldMember.roles.cache.size > newMember.roles.cache.size
			? newMember.guild.language.tget('eventGuildMemberUpdateRoleUpdateRemovedFrom')
			: newMember.guild.language.tget('eventGuildMemberUpdateRoleUpdateAddedTo');

		const executor = await getExecutor(newMember.guild, 'MEMBER_ROLE_UPDATE');
		const role = await this.getRoleFromAuditLogs(newMember.guild);

		const embedData = newMember.guild.language.tget('eventGuildMemberUpdateRoleUpdateEmbed');

		const embed = new MessageEmbed()
			.setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
			.setColor(LogColors.TURQUOISE)
			.setFooter(embedData.footer(newMember.id))
			.setTimestamp()
			.setTitle(embedData.title(roleUpdateType, role.name, executor.tag));

		return memberlog.send(embed);
	}

	private async handleTrustedRole(oldMember: GuildMember, newMember: GuildMember): Promise<void> {
		const { guild } = newMember;
		const role = await this.getRoleFromAuditLogs(newMember.guild);
		const trustedRole = guild.roles.cache.get(guild.settings.get(GuildSettings.Roles.Trusted));
		const trustedRoleSetting: TrustedRoleSetting = guild.settings.get(GuildSettings.Roles.GiveTrustedRoleOn);
		const restrictedRoles = guild.settings.get(GuildSettings.Roles.Restricted) as string[];

		if (trustedRoleSetting === 'role') {
			if (newMember.roles.cache.size === 2 && oldMember.roles.cache.size < newMember.roles.cache.size) {
				if (!restrictedRoles.includes(role.id)) {
					if (trustedRole && !newMember.roles.cache.has(trustedRole.id)) {
						floatPromise(this, newMember.roles.add(trustedRole));
					}
				}
			}
		}
	}

	private async getRoleFromAuditLogs(guild: Guild): Promise<Role> {
		const logs = await guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_ROLE_UPDATE' });
		return logs.entries.first()!.changes![0].new[0];
	}

}

export type TrustedRoleSetting = 'none' | 'join' | 'role';
