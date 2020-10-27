import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel, GuildEmoji } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor, floatPromise } from '@utils/util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Event {

	public run(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): void {
		if (newEmoji.guild.settings.get(GuildSettings.LogEvents.EmojiUpdate) as boolean) {
			const serverlog = newEmoji.guild.channels.cache.get(newEmoji.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;

			if (serverlog) {
				if (oldEmoji.name !== newEmoji.name) floatPromise(this, this.logEmojiNameChange(oldEmoji, newEmoji, serverlog));
			}
		}
	}

	private async logEmojiNameChange(oldEmoji: GuildEmoji, newEmoji: GuildEmoji, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(newEmoji.guild, 'EMOJI_UPDATE');

		const EMBED_DATA = newEmoji.guild.language.tget('EVENT_EMOJIUPDATE_NAMECHANGE_EMBED');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.PINK)
			.setFooter(EMBED_DATA.FOOTER(newEmoji.id))
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE(oldEmoji.name, newEmoji.name, newEmoji.animated));

		return serverlog.send(embed);
	}

}
