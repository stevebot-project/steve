import { Event } from 'klasa';
import { User, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Colors } from '@lib/types/enums';
import { newEmbed } from '@utils/util';

module.exports = class extends Event {

	public async run(oldUser: User, newUser: User): Promise<void> {
		for (const [id, guild] of this.client.guilds.cache) { // eslint-disable-line @typescript-eslint/no-unused-vars
			if (!guild.members.cache.has(newUser.id)) return;

			const memberlog = guild.channels.cache.get(guild.settings.get(GuildSettings.Channels.Memberlog)) as TextChannel;
			if (!memberlog) continue;

			if (oldUser.username === newUser.username) return;

			const embed = newEmbed()
				.setAuthor(oldUser.tag, oldUser.displayAvatarURL())
				.setColor(Colors.Turquoise)
				.setFooter(`User ID: ${newUser.id}`)
				.setTimestamp()
				.addFields([
					{ name: 'New Username', value: newUser.username }
				]);

			memberlog.send(embed);
		}

		return this.client.console.log('finished logging username changes');
	}

};
