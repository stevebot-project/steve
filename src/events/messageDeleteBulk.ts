import { Collection, Message, DMChannel, TextChannel, MessageEmbed } from 'discord.js';
import { Event } from 'klasa';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, getExecutor } from '@utils/util';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(msgs: MessageCollection): void {
		if (msgs.first()!.channel instanceof DMChannel) return;

		if (msgs.first()!.guild!.settings.get(GuildSettings.LogEvents.MessageDeleteBulk) as boolean) {
			const serverlog = msgs.first()!.guild!.channels.cache.get(msgs.first()!.guild!.settings.get(GuildSettings.Channels.Serverlog));
			if (serverlog && serverlog.isGuildTextChannel()) floatPromise(this, this.handleLog(msgs, serverlog));
		}
	}

	private async handleLog(msgs: MessageCollection, serverlog: TextChannel): Promise<Message | undefined> {
		if (msgs.first()!.channel instanceof DMChannel) return;

		const guild = msgs.first()!.guild!;
		const channel = msgs.first()!.channel as TextChannel;

		const parent = channel.parent ? channel.parent.name : guild.language.tget('noParentCategory');
		const executor = await getExecutor(guild, 'MESSAGE_BULK_DELETE');

		const embedData = guild.language.tget('eventMessageDeleteBulkEmbed');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.REDORANGE)
			.setFooter(embedData.footer(channel.id))
			.setTimestamp()
			.setTitle(embedData.title(msgs.size, channel.name, parent));

		return serverlog.send(embed);
	}

}

type MessageCollection = Collection<string, Message>;
