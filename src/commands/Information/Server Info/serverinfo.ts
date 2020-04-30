import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { oneLine } from 'common-tags';
import { Colors } from '@lib/types/enums';
import { newEmbed, friendlyDuration, formatDate } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['serverstats'],
			description: lang => lang.get('COMMAND_SERVERINFO_DESCRIPTION'),
			examples: ['serverinfo'],
			runIn: ['text']
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const guildCreationDate = oneLine`Created ${formatDate(msg.guild.createdTimestamp)}
			(${friendlyDuration(Date.now() - msg.guild.createdTimestamp)} ago)`;

		const membersWithRoles = msg.guild.members.cache.filter(m => m.roles.cache.size > 1).size;
		const percentage = Math.floor((msg.guild.members.cache.filter(m => m.roles.cache.size > 1).size / msg.guild.memberCount) * 100);

		const embed = newEmbed()
			.addFields([
				{ name: 'Total Members', value: msg.guild.memberCount, inline: true },
				{ name: 'Humans', value: msg.guild.members.cache.filter(m => !m.user.bot).size, inline: true },
				{ name: 'Bots', value: msg.guild.members.cache.filter(m => m.user.bot).size, inline: true },
				{ name: 'Text Channels', value: msg.guild.channels.cache.filter(c => c.type === 'text').size, inline: true },
				{ name: 'Voice Channels', value: msg.guild.channels.cache.filter(c => c.type === 'voice').size, inline: true },
				{ name: 'Roles', value: msg.guild.roles.cache.size, inline: true },
				{ name: 'Emojis', value: msg.guild.emojis.cache.size, inline: true },
				{ name: 'Members with Roles', value: `${membersWithRoles} (${percentage}%)`, inline: true }
			])
			.setAuthor(msg.guild.name, msg.guild.iconURL())
			.setColor(Colors.YellowGreen)
			.setFooter(guildCreationDate)
			.setTimestamp();

		return msg.channel.send(embed);
	}

}
