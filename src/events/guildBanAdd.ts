import { Event } from 'klasa';
import { Guild, User, Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { getExecutor, newEmbed } from '@utils/util';

export default class extends Event {

	public async run(guild: Guild, user: User): Promise<Message | void> {
		const memberlog = guild.channels.cache.get(guild.settings.get(GuildSettings.Channels.Memberlog)) as TextChannel;
		if (!memberlog) return;

		const executor = await getExecutor(guild, 'MEMBER_BAN_ADD');

		const embed = newEmbed()
			.setAuthor(user.tag, user.displayAvatarURL())
			.setColor(Colors.Red)
			.setFooter(`User ID: ${user.id}`)
			.setTimestamp()
			.setTitle(`Banned by ${executor.tag}`);

		return memberlog.send(embed);
	}

}
