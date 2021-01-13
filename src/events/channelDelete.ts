import { Event } from 'klasa';
import { DMChannel, GuildChannel, Message, MessageEmbed, TextChannel } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor, floatPromise } from '@utils/util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Event {

	public run(channel: DMChannel | GuildChannel): void {
		if (channel instanceof DMChannel) return;

		if (channel.guild.settings.get(GuildSettings.LogEvents.ChannelDelete) as boolean) {
			const serverlog = channel.guild.channels.cache.get(channel.guild.settings.get(GuildSettings.Channels.Serverlog));
			if (serverlog && serverlog.isGuildTextChannel()) floatPromise(this, this.handleLog(channel, serverlog));
		}
	}

	private async handleLog(channel: GuildChannel, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(channel.guild, 'CHANNEL_DELETE');

		const embedData = channel.guild.language.tget('eventChanneldeleteEmbed');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.PURPLE)
			.setFooter(embedData.footer(channel.id))
			.setTimestamp()
			.setTitle(embedData.title(channel.type, channel.name));

		return serverlog.send(embed);
	}

}
