import { Event } from 'klasa';
import { GuildMember, TextChannel, Guild, Message, MessageEmbed } from 'discord.js';
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

		if (!oldMember.roles.cache.equals(newMember.roles.cache)) floatPromise(this, this.handleAutoRole(oldMember, newMember));
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

	private async getRoleFromAuditLogs(guild: Guild) {
		const logs = await guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_ROLE_UPDATE' });
		return logs.entries.first()!.changes![0].new[0];
	}

	private async handleAutoRole(oldMember: GuildMember, newMember: GuildMember) {
		const { guild } = newMember;
		const role = await this.getRoleFromAuditLogs(newMember.guild);
		const autoRole = guild.roles.cache.get(guild.settings.get(GuildSettings.Roles.Auto));
		const autoRoleSetting = guild.settings.get(GuildSettings.Roles.AutoRoleSetting);

		const restrictedRoles = guild.settings.get(GuildSettings.Roles.Restricted) as string[];

		if (autoRoleSetting === 'role') {
			if (newMember.roles.cache.size === 2 && oldMember.roles.cache.size < newMember.roles.cache.size) { // TODO: handle multiple roles being added at once
				if (!restrictedRoles.includes(role.id)) {
					if (autoRole && !newMember.roles.cache.has(autoRole.id)) {
						floatPromise(this, newMember.roles.add(autoRole));
					}
				}
			}
		}
	}

}
