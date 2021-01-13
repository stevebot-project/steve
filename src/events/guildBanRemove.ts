import { Event } from 'klasa';
import { Guild, User, TextChannel, Message, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, getExecutor } from '@utils/util';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(guild: Guild, user: User): void {
		if (guild.settings.get(GuildSettings.LogEvents.GuildBanRemove) as boolean) {
			const memberlog = guild.channels.cache.get(guild.settings.get(GuildSettings.Channels.Memberlog));
			if (memberlog && memberlog.isGuildTextChannel()) floatPromise(this, this.handleLog(guild, user, memberlog));
		}
	}

	private async handleLog(guild: Guild, user: User, memberlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(guild, 'MEMBER_BAN_REMOVE');

		const embedData = guild.language.tget('eventGuildbanremoveEmbed');

		const embed = new MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL())
			.setColor(LogColors.RED)
			.setFooter(embedData.footer(user.id))
			.setTimestamp()
			.setTitle(embedData.title(executor.tag));

		return memberlog.send(embed);
	}

}
