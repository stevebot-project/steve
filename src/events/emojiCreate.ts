import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel, GuildEmoji } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor, floatPromise } from '@utils/util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Event {

	public run(emoji: GuildEmoji): void {
		if (emoji.guild.settings.get(GuildSettings.LogEvents.EmojiCreate) as boolean) {
			const serverlog = emoji.guild.channels.cache.get(emoji.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
			if (serverlog) floatPromise(this, this.handleLog(emoji, serverlog));
		}
	}

	private async handleLog(emoji: GuildEmoji, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(emoji.guild, 'EMOJI_CREATE');

		const EMBED_DATA = emoji.guild.language.tget('EVENT_EMOJICREATE_EMBED');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.PINK)
			.setFooter(EMBED_DATA.FOOTER(emoji.id))
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE(emoji.name));

		return serverlog.send(embed);
	}

}
