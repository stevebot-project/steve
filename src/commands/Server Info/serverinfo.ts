import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, MessageEmbed } from 'discord.js';
import { friendlyDuration, formatDate } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['serverstats'],
			description: lang => lang.get('COMMAND_SERVERINFO_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_SERVERINFO_EXTENDED'),
			runIn: ['text']
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const guildCreationDate = msg.guild!.language.get('COMMAND_SERVERINFO_GUILDCREATION',
			formatDate(msg.guild!.createdTimestamp), friendlyDuration(Date.now() - msg.guild!.createdTimestamp));

		const membersWithRoles = msg.guild!.members.cache.filter(m => m.roles.cache.size > 1).size;
		const percentage = Math.floor((msg.guild!.members.cache.filter(m => m.roles.cache.size > 1).size / msg.guild!.memberCount) * 100);

		const embed = new MessageEmbed()
			.addFields([
				{ name: msg.guild!.language.get('COMMAND_SERVERINFO_EMBED_TOTALMEMBERS'), value: msg.guild!.memberCount, inline: true },
				{ name: msg.guild!.language.get('COMMAND_SERVERINFO_EMBED_HUMANS'), value: msg.guild!.members.cache.filter(m => !m.user.bot).size, inline: true },
				{ name: msg.guild!.language.get('COMMAND_SERVERINFO_EMBED_BOTS'), value: msg.guild!.members.cache.filter(m => m.user.bot).size, inline: true },
				{ name: msg.guild!.language.get('COMMAND_SERVERINFO_EMBED_TEXTCHANNELS'), value: msg.guild!.channels.cache.filter(c => c.type === 'text').size, inline: true },
				{ name: msg.guild!.language.get('COMMAND_SERVERINFO_EMBED_VOICECHANNELS'), value: msg.guild!.channels.cache.filter(c => c.type === 'voice').size, inline: true },
				{ name: msg.guild!.language.get('COMMAND_SERVERINFO_EMBED_ROLES'), value: msg.guild!.roles.cache.size, inline: true },
				{ name: msg.guild!.language.get('COMMAND_SERVERINFO_EMBED_EMOJIS'), value: msg.guild!.emojis.cache.size, inline: true },
				{ name: msg.guild!.language.get('COMMAND_SERVERINFO_EMBED_PERCENTAGE'), value: `${membersWithRoles} (${percentage}%)`, inline: true }
			])
			.setAuthor(msg.guild!.name, msg.guild!.iconURL()!)
			.setFooter(guildCreationDate)
			.setTimestamp();

		return msg.channel.send(embed);
	}

}
