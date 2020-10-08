
import { Event } from 'klasa';
import { DMChannel, TextChannel, Message, Channel, GuildChannel, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, getExecutor } from '@utils/util';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(oldChannel: Channel, newChannel: Channel): void {
		if (newChannel instanceof DMChannel) return;

		const serverlog = (newChannel as GuildChannel).guild.channels.cache.get((newChannel as GuildChannel).guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (serverlog) {
			if ((oldChannel as GuildChannel).name !== (newChannel as GuildChannel).name) floatPromise(this, this.logChannelNameChange(oldChannel as GuildChannel, newChannel as GuildChannel, serverlog));
		}
	}

	private async logChannelNameChange(oldChannel: GuildChannel, newChannel: GuildChannel, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(newChannel.guild, 'CHANNEL_UPDATE');

		const EMBED_DATA = newChannel.guild.language.tget('EVENT_CHANNELUPDATE_NAMECHANGE_EMBED');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.PURPLE)
			.setFooter(EMBED_DATA.FOOTER(newChannel.id))
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE(oldChannel.name, newChannel.name, newChannel.type));

		return serverlog.send(embed);
	}

}
