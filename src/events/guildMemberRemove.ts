import { Event } from 'klasa';
import { GuildMember, Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { newEmbed, friendlyDuration } from '@utils/util';

export default class extends Event {

	public async run(member: GuildMember): Promise<Message | void> {
		const memberlog = member.guild.channels.cache.get(member.guild.settings.get(GuildSettings.Channels.Memberlog)) as TextChannel;
		if (!memberlog) return;

		const joinedTime = friendlyDuration(Date.now() - member.joinedTimestamp);

		let memberRoles = member.roles.cache.filter(r => r.id !== member.guild.id).map(r => r.name).join(', ');
		memberRoles = memberRoles.length > 0 ? memberRoles : 'None';

		const embed = newEmbed()
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setColor(Colors.Turquoise)
			.setFooter(`Member ID: ${member.id}`)
			.setTimestamp()
			.addFields([
				{ name: `${member.user.bot ? 'Bot' : 'Member'} Left Server`, value: `Joined ${joinedTime} ago`, inline: true },
				{ name: 'Roles', value: memberRoles, inline: true }
			]);

		return memberlog.send(embed);
	}

}
