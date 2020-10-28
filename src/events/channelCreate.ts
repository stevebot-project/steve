import { Event } from 'klasa';
import { DMChannel, GuildChannel, Message, MessageEmbed, TextChannel } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor, floatPromise } from '@utils/util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Event {

	public run(channel: DMChannel | GuildChannel): void {
		if (channel instanceof DMChannel) return;

		if (channel.guild.settings.get(GuildSettings.LogEvents.ChannelCreate) as boolean) {
			const serverlog = channel.guild.channels.cache.get(channel.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
			if (serverlog) floatPromise(this, this.handleLog(channel, serverlog));
		}
	}

	private async handleLog(channel: GuildChannel, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(channel.guild, 'CHANNEL_CREATE');

		const EMBED_DATA = channel.guild.language.tget('EVENT_CHANNELCREATE_EMBED');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.PURPLE)
			.setFooter(EMBED_DATA.FOOTER(channel.id))
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE(channel.type, channel.name));

		return serverlog.send(embed);
	}

}
