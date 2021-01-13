
import { Event } from 'klasa';
import { DMChannel, TextChannel, Message, Channel, GuildChannel, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, getExecutor } from '@utils/util';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(oldChannel: Channel, newChannel: Channel): void {
		if (newChannel instanceof DMChannel) return;

		if ((newChannel as GuildChannel).guild.settings.get(GuildSettings.LogEvents.ChannelUpdate) as boolean) {
			const serverlog = (newChannel as GuildChannel).guild.channels.cache.get((newChannel as GuildChannel).guild.settings.get(GuildSettings.Channels.Serverlog));
			if (serverlog && serverlog.isGuildTextChannel()) {
				if ((oldChannel as GuildChannel).name !== (newChannel as GuildChannel).name) floatPromise(this, this.logChannelNameChange(oldChannel as GuildChannel, newChannel as GuildChannel, serverlog));
			}
		}
	}

	private async logChannelNameChange(oldChannel: GuildChannel, newChannel: GuildChannel, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(newChannel.guild, 'CHANNEL_UPDATE');

		const embedData = newChannel.guild.language.tget('eventChannelUpdateNameChangeEmbed');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.PURPLE)
			.setFooter(embedData.footer(newChannel.id))
			.setTimestamp()
			.setTitle(embedData.title(oldChannel.name, newChannel.name, newChannel.type));

		return serverlog.send(embed);
	}

}
