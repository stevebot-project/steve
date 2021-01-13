import { Event } from 'klasa';
import { GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { friendlyDuration, getExecutor, floatPromise } from '@utils/util';
import { LogColors } from '@lib/types/Enums';
import { TrustedRoleSetting } from './guildMemberUpdate';

export default class extends Event {

	public run(member: GuildMember): void {
		if (member.guild.settings.get(GuildSettings.LogEvents.GuildMemberAdd) as boolean) {
			const memberlog = member.guild.channels.cache.get(member.guild.settings.get(GuildSettings.Channels.Memberlog));
			if (memberlog && memberlog.isGuildTextChannel()) floatPromise(this, this.handleLog(member, memberlog));
		}

		this.handleTrustedRole(member);
	}

	private async handleLog(member: GuildMember, memberlog: TextChannel): Promise<Message> {
		const accountCreatedTime = friendlyDuration(Date.now() - member.user.createdTimestamp);

		const embedData = member.guild.language.tget('eventGuildmemberaddEmbed');

		const embed = new MessageEmbed()
			.addFields(
				{
					name: embedData.fieldTitles.human,
					value: embedData.fieldValues.accountAge(accountCreatedTime)
				}
			)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setColor(LogColors.TURQUOISE)
			.setFooter(embedData.footer(member.id))
			.setTimestamp();

		if (member.user.bot) {
			const executor = await getExecutor(member.guild, 'BOT_ADD');
			embed.fields[0].name = embedData.fieldTitles.bot(executor.tag);
		}

		return memberlog.send(embed);
	}

	private handleTrustedRole(member: GuildMember): void {
		const { guild } = member;
		const trustedRole = guild.roles.cache.get(guild.settings.get(GuildSettings.Roles.Trusted));
		const trustedRoleSetting: TrustedRoleSetting = guild.settings.get(GuildSettings.Roles.GiveTrustedRoleOn);

		if (trustedRole && trustedRoleSetting === 'join') floatPromise(this, member.roles.add(trustedRole));
	}

}
