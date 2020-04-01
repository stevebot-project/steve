import { Event } from 'klasa';
import { GuildEmoji, Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { getExecutor, newEmbed, noLog } from '@utils/util';

export default class extends Event {

	public async run(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): Promise<Message | void> {
		const serverlog = newEmoji.guild.channels.cache.get(newEmoji.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (!serverlog) return noLog(this.client.console, 'server', newEmoji.guild.name);

		const executor = await getExecutor(newEmoji.guild, 'EMOJI_UPDATE');

		const embed = newEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(Colors.Pink)
			.setFooter(`Emoji ID: ${newEmoji.id}`)
			.setTimestamp()
			.setTitle(`${oldEmoji.name} ${newEmoji.animated ? 'animated ' : ''}emoji name changed to ${newEmoji.name}`);

		return serverlog.send(embed);
	}

}
