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

		const EMBED_DATA = member.guild.language.tget('EVENT_GUILDMEMBERADD_EMBED');

		const embed = new MessageEmbed()
			.addFields(
				{
					name: EMBED_DATA.FIELD_TITLES.HUMAN,
					value: EMBED_DATA.FIELD_VALUES.ACCOUNT_AGE(accountCreatedTime)
				}
			)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setColor(LogColors.TURQUOISE)
			.setFooter(EMBED_DATA.FOOTER(member.id))
			.setTimestamp();

		if (member.user.bot) {
			const executor = await getExecutor(member.guild, 'BOT_ADD');
			embed.fields[0].name = EMBED_DATA.FIELD_TITLES.BOT(executor.tag);
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
