import { Event } from 'klasa';
import { DMChannel, GuildChannel, Message, MessageEmbed, TextChannel } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor, toTitleCase } from '@utils/Util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Event {

	public async run(channel: DMChannel | GuildChannel): Promise<Message | undefined> {
		if (channel instanceof DMChannel) return;

		const serverlog = channel.guild.channels.cache.get(channel.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (!serverlog) return;

		const executor = await getExecutor(channel.guild, 'CHANNEL_DELETE');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.PURPLE)
			.setFooter(channel.guild.language.get('EVENT_CHANNEL_FOOTER', channel.id))
			.setTimestamp()
			.setTitle(channel.guild.language.get('EVENT_CHANNELDELETE_TITLE', toTitleCase(channel.type), channel.name));

		return serverlog.send(embed);
	}

}
