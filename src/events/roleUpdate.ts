import { Event } from 'klasa';
import { Role, Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { getExecutor, newEmbed, noLog } from '@utils/util';

module.exports = class extends Event {

	public async run(oldRole: Role, newRole: Role): Promise<Message | void> {
		if (oldRole.name === newRole.name) return;

		const serverlog = newRole.guild.channels.cache.get(newRole.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (!serverlog) return noLog(this.client.console, 'server', newRole.guild.name);

		const executor = await getExecutor(newRole.guild, 'ROLE_UPDATE');

		const inline = oldRole.name.length < 14;

		const embed = newEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(Colors.Yellow)
			.setFooter(`Role ID: ${newRole.id}`)
			.setTimestamp()
			.setTitle('Role Name Changed')
			.addFields([
				{ name: 'Old Role Name', value: oldRole.name, inline: inline },
				{ name: 'New Role Name', value: newRole.name, inline: inline }
			]);

		return serverlog.send(embed);
	}

};
