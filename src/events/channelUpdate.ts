import { Event } from 'klasa';
import { DMChannel, TextChannel, Message } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { getExecutor, newEmbed } from '@utils/util';

export default class extends Event {

	public async run(oldChannel, newChannel): Promise<Message | void> {
		if (newChannel instanceof DMChannel || oldChannel.name === newChannel.name) return;

		const serverlog = newChannel.guild.channels.cache.get(newChannel.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (!serverlog) return;

		const executor = await getExecutor(newChannel.guild, 'CHANNEL_UPDATE');

		const embed = newEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(Colors.Purple)
			.setFooter(`Channel ID: ${newChannel.id}`)
			.setTimestamp()
			.setTitle(`${oldChannel.name} ${newChannel.type} channel name changed to ${newChannel.name}`);

		return serverlog.send(embed);
	}

}
