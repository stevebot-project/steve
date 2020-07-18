import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel, GuildEmoji } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor } from '@utils/Util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Event {

	public async run(emoji: GuildEmoji): Promise<Message | undefined> {
		const serverlog = emoji.guild.channels.cache.get(emoji.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (!serverlog) return;

		const executor = await getExecutor(emoji.guild, 'EMOJI_CREATE');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.PINK)
			.setFooter(emoji.guild.language.get('EVENT_EMOJI_FOOTER', emoji.id))
			.setTimestamp()
			.setTitle(emoji.guild.language.get('EVENT_EMOJICREATE_TITLE', emoji.name));

		return serverlog.send(embed);
	}

}
