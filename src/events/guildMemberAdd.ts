import { Event } from 'klasa';
import { GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { friendlyDuration, getExecutor, floatPromise } from '@utils/util';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(member: GuildMember): void {
		const memberlog = member.guild.channels.cache.get(member.guild.settings.get(GuildSettings.Channels.Memberlog)) as TextChannel;
		if (memberlog) floatPromise(this, this.handleLog(member, memberlog));
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

}
