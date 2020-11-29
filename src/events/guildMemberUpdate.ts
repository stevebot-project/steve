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
				if (oldMember.displayName !== newMember.displayName) floatPromise(this, this.logDisplayNameChange(oldMember, newMember, memberlog));
				if (!oldMember.roles.cache.equals(newMember.roles.cache)) floatPromise(this, this.logRoleUpdate(oldMember, newMember, memberlog));
			}
		}

		if (!oldMember.roles.cache.equals(newMember.roles.cache)) floatPromise(this, this.handleTrustedRole(oldMember, newMember));
	}

	private async logDisplayNameChange(oldMember: GuildMember, newMember: GuildMember, memberlog: TextChannel): Promise<Message> {
		const EMBED_DATA = newMember.guild.language.tget('EVENT_GUILDMEMBERUPDATE_DISPLAYNAMECHANGE_EMBED');

		const embed = new MessageEmbed()
			.addFields(
				{ name: EMBED_DATA.FIELD_TITLES.NEW_DISPLAY_NAME, value: newMember.displayName }
			)
			.setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
			.setColor(LogColors.TURQUOISE)
			.setFooter(EMBED_DATA.FOOTER(newMember.id))
			.setTimestamp();

		return memberlog.send(embed);
	}

	private async logRoleUpdate(oldMember: GuildMember, newMember: GuildMember, memberlog: TextChannel): Promise<Message> {
		const roleUpdateType = oldMember.roles.cache.size > newMember.roles.cache.size
			? newMember.guild.language.tget('EVENT_GUILDMEMBERUPDATE_ROLEUPDATE_REMOVEDFROM')
			: newMember.guild.language.tget('EVENT_GUILDMEMBERUPDATE_ROLEUPDATE_ADDEDTO');

		const executor = await getExecutor(newMember.guild, 'MEMBER_ROLE_UPDATE');
		const role = await this.getRoleFromAuditLogs(newMember.guild);

		const EMBED_DATA = newMember.guild.language.tget('EVENT_GUILDMEMBERUPDATE_ROLEUPDATE_EMBED');

		const embed = new MessageEmbed()
			.setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
			.setColor(LogColors.TURQUOISE)
			.setFooter(EMBED_DATA.FOOTER(newMember.id))
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE(roleUpdateType, role.name, executor.tag));

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
