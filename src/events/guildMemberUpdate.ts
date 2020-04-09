import { Event } from 'klasa';
import { GuildMember, Message, TextChannel, Guild, Role } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { getExecutor, newEmbed } from '@utils/util';

export default class extends Event {

	public async run(oldMember: GuildMember, newMember: GuildMember): Promise<Message | void> {
		const memberlog = newMember.guild.channels.cache.get(newMember.guild.settings.get(GuildSettings.Channels.Memberlog)) as TextChannel;
		if (!memberlog) return;

		// display name changes
		if (oldMember.displayName !== newMember.displayName) {
			const embed = newEmbed()
				.setColor(Colors.Turquoise)
				.setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
				.setFooter(`Member ID: ${newMember.id}`)
				.setTimestamp()
				.addFields([
					{ name: 'New Display Name', value: newMember.displayName }
				]);

			return memberlog.send(embed);
		}

		// role updates
		if (!oldMember.roles.cache.equals(newMember.roles.cache)) {
			const roleUpdateType = oldMember.roles.cache.size > newMember.roles.cache.size ? 'Removed from' : 'Added to';

			const executor = await getExecutor(newMember.guild, 'MEMBER_ROLE_UPDATE');

			const role = await this.getRole(newMember.guild);

			/* eslint-disable max-depth */
			if (newMember.guild.settings.get(GuildSettings.Roles.GiveTrustedRoleOn) === 'role') {
				if (newMember.roles.cache.size === 2 && roleUpdateType === 'Added to') {
					if (!newMember.guild.settings.get(GuildSettings.Roles.Private).includes(role.id)) {
						if (newMember.guild.trustedRole && !newMember.roles.cache.has(newMember.guild.trustedRole.id)) {
							await newMember.roles.add(newMember.guild.trustedRole);
						}
					}
				}
			}

			const embed = newEmbed()
				.setAuthor(newMember.user.tag, newMember.user.displayAvatarURL())
				.setColor(Colors.Turquoise)
				.setFooter(`Member ID: ${newMember.id}`)
				.setTimestamp()
				.setTitle(`${roleUpdateType} the ${role.name} role by ${executor.tag}`);

			return memberlog.send(embed);
		}

		return this.client.console.log(`GuildMemberUpdate in ${newMember.guild.name} not logged.`);
	}

	private async getRole(guild: Guild): Promise<Role> {
		const logs = await guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_ROLE_UPDATE' });

		return logs.entries.first()!.changes![0].new[0];
	}

}
