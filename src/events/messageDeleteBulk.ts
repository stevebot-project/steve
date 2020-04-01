import { Event } from 'klasa';
import { Collection, Snowflake, Message, TextChannel, DMChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { getExecutor, newEmbed, noLog } from '@utils/util';

export default class extends Event {

	public async run(msgs: Collection<Snowflake, Message>): Promise<Message | void> {
		if (msgs.first().channel instanceof DMChannel) return this.client.console.log('No logging of DMChannel bulk deletion.');

		const serverlog = msgs.first().guild.channels.cache.get(msgs.first().guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (!serverlog) return noLog(this.client.console, 'server', msgs.first().guild.name);

		/* eslint-disable-next-line no-extra-parens */
		const parent = (msgs.first().channel as TextChannel).parent ? (msgs.first().channel as TextChannel).parent : 'No Category';

		const executor = await getExecutor(msgs.first().guild, 'MESSAGE_BULK_DELETE');

		const embed = newEmbed()
			.setTitle(`${msgs.size} messages purged from ${(msgs.first().channel as TextChannel).name} (${parent})`) // eslint-disable-line no-extra-parens
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setFooter(`Channel ID: ${msgs.first().channel.id}`)
			.setTimestamp()
			.setColor(Colors.RedOrange);

		return serverlog.send(embed);
	}

}
