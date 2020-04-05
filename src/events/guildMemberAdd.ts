import { Event } from 'klasa';
import { TextChannel, GuildMember, Message } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { getExecutor, newEmbed, friendlyDuration } from '@utils/util';

export default class extends Event {

	public async run(member: GuildMember): Promise<Message | void> {
		const memberlog = member.guild.channels.cache.get(member.guild.settings.get(GuildSettings.Channels.Memberlog)) as TextChannel;
		if (!memberlog) return;

		const joinedTime = friendlyDuration(Date.now() - member.user.createdTimestamp);

		const embed = newEmbed()
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setColor(Colors.Turquoise)
			.setFooter(`Member ID: ${member.id}`)
			.setTimestamp()
			.addFields([
				{ name: 'Member Joined Server', value: `Account created ${joinedTime} ago` }
			]);

		if (member.user.bot) {
			const executor = await getExecutor(member.guild, 'BOT_ADD');
			embed.fields[0].name = `Bot added by ${executor.tag}`;
		}

		const { settings } = member.guild;
		const trustedRoleSetting = settings.get(GuildSettings.Roles.GiveTrustedRoleOn);
		if (member.guild.trustedRole && trustedRoleSetting === 'join' && !member.user.bot) {
			await member.roles.add(member.guild.trustedRole);
		}

		return memberlog.send(embed);
	}

}
