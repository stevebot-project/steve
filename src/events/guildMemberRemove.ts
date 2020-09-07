import { Event } from 'klasa';
import { GuildMember, Message, TextChannel, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { LogColors } from '@lib/types/Enums';
import { friendlyDuration, floatPromise } from '@utils/util';

export default class extends Event {

	public run(member: GuildMember): void {
		const memberlog = member.guild.channels.cache.get(member.guild.settings.get(GuildSettings.Channels.Memberlog)) as TextChannel;
		if (memberlog) floatPromise(this, this.handleLog(member, memberlog));
	}

	private async handleLog(member: GuildMember, memberlog: TextChannel): Promise<Message> {
		if (!member.joinedTimestamp) member = await member.guild.members.fetch(member.user);

		let memberRoles = member.roles.cache.filter(r => r.id !== member.guild.id).map(r => r.name).join(', ');
		memberRoles = memberRoles.length > 0 ? memberRoles : member.guild.language.tget('NONE');

		const embed = new MessageEmbed()
			.addFields(
				{
					name: member.guild.language.tget('EVENT_GUILDMEMBERREMOVE_LEFTGUILD', member.user.bot),
					value: member.guild.language.tget('EVENT_GUILDMEMBERREMOVE_JOINEDGUILD', friendlyDuration(Date.now() - member.joinedTimestamp!)),
					inline: true
				},
				{ name: member.guild.language.tget('ROLES'), value: memberRoles, inline: true }
			)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setColor(LogColors.TURQUOISE)
			.setFooter(member.guild.language.tget('EVENT_GUILDMEMBER_FOOTER', member.id))
			.setTimestamp();

		return memberlog.send(embed);
	}

}
