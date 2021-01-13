import { Event } from 'klasa';
import { GuildMember, Message, TextChannel, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { LogColors } from '@lib/types/Enums';
import { friendlyDuration, floatPromise } from '@utils/util';

export default class extends Event {

	public run(member: GuildMember): void {
		if (member.guild.settings.get(GuildSettings.LogEvents.GuildMemberRemove) as boolean) {
			const memberlog = member.guild.channels.cache.get(member.guild.settings.get(GuildSettings.Channels.Memberlog));
			if (memberlog && memberlog.isGuildTextChannel()) floatPromise(this, this.handleLog(member, memberlog));
		}
	}

	private async handleLog(member: GuildMember, memberlog: TextChannel): Promise<Message> {
		if (!member.joinedTimestamp) member = await member.guild.members.fetch(member.user);

		let memberRoles = member.roles.cache.filter(r => r.id !== member.guild.id).map(r => r.name).join(', ');
		memberRoles = memberRoles.length > 0 ? memberRoles : member.guild.language.tget('none');

		const embedData = member.guild.language.tget('eventGuildmemberremoveEmbed');

		const embed = new MessageEmbed()
			.addFields(
				{
					name: embedData.fieldTitles.joinDate(member.user.bot),
					value: embedData.fieldValues.joinDate(friendlyDuration(Date.now() - member.joinedTimestamp!)),
					inline: true
				},
				{ name: embedData.fieldTitles.roles, value: memberRoles, inline: true }
			)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setColor(LogColors.TURQUOISE)
			.setFooter(embedData.footer(member.id))
			.setTimestamp();

		return memberlog.send(embed);
	}

}
