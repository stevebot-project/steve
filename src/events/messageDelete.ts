import { Event, KlasaMessage } from 'klasa';
import { DMChannel, Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { newEmbed, friendlyDuration } from '@utils/util';

export default class extends Event {

	public async run(msg: KlasaMessage): Promise<Message | void> {
		if (msg.type === 'PINS_ADD' || msg.channel instanceof DMChannel) return this.client.console.log('Message deletion not logged.');


		const serverlog = msg.guild.channels.cache.get(msg.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (!serverlog) return;

		const msgContent = msg.content.length < 1024 && msg.content.length > 0 ? msg.content : 'Message is unable to be displayed.';

		const msgSentTime = friendlyDuration(Date.now() - msg.createdTimestamp);

		const parent = msg.channel.parent ? msg.channel.parent.name : 'No Category';

		const embed = newEmbed()
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setColor(Colors.RedOrange)
			.setFooter(`Message ID: ${msg.id} | Message sent ${msgSentTime} ago`)
			.setTimestamp()
			.addFields([
				{ name: `Message Deleted in ${msg.channel.name} (${parent})`, value: msgContent }
			]);

		return serverlog.send(embed);
	}

}
