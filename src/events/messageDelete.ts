import { Event, KlasaMessage } from 'klasa';
import { MessageEmbed, DMChannel, TextChannel, Message } from 'discord.js';
import { floatPromise, friendlyDuration } from '@utils/util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(msg: KlasaMessage): void {
		if (msg.type === 'PINS_ADD' || msg.channel instanceof DMChannel) return;

		if (msg.guild!.settings.get(GuildSettings.LogEvents.MessageDelete) as boolean) {
			const serverlog = msg.guild!.channels.cache.get(msg.guild!.settings.get(GuildSettings.Channels.Serverlog));
			if (serverlog && serverlog.isGuildTextChannel()) floatPromise(this, this.handleLog(msg, serverlog));
		}
	}

	private async handleLog(msg: KlasaMessage, serverlog: TextChannel): Promise<Message | undefined> {
		if (msg.channel instanceof DMChannel) return; // way to just delcare that msg.channel is a TextChannel instead of a redundant if?

		const msgContent = msg.content.length < 1024 && msg.content.length > 0
			? msg.content
			: msg.guild!.language.tget('eventMessagedeleteUnableToDisplay');

		const parent = msg.channel.parent
			? msg.channel.parent.name
			: msg.guild!.language.tget('noParentCategory');

		const msgSentTime = friendlyDuration(Date.now() - msg.createdTimestamp);

		const embedData = msg.guild!.language.tget('eventMessagedeleteEmbed');

		const embed = new MessageEmbed()
			.addFields(
				{ name: embedData.fieldTitles.channel(msg.channel.name, parent), value: msgContent }
			)
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setColor(LogColors.REDORANGE)
			.setFooter(embedData.footer(msg.id, msgSentTime))
			.setTimestamp();

		return serverlog.send(embed);
	}

}
