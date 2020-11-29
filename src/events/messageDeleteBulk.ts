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

		const parent = channel.parent ? channel.parent.name : guild.language.tget('NO_PARENT_CATEGORY');
		const executor = await getExecutor(guild, 'MESSAGE_BULK_DELETE');

		const EMBED_DATA = guild.language.tget('EVENT_MESSAGEDELETEBULK_EMBED');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.REDORANGE)
			.setFooter(EMBED_DATA.FOOTER(channel.id))
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE(msgs.size, channel.name, parent));

		return serverlog.send(embed);
	}

}

type MessageCollection = Collection<string, Message>;
