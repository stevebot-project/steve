import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions } from 'klasa';
import { Message, MessageEmbed } from 'discord.js';
import { friendlyDuration, formatDate } from '@utils/util';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<CommandOptions>({
	aliases: ['serverstats'],
	description: lang => lang.tget('COMMAND_SERVERINFO_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_SERVERINFO_EXTENDED'),
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage): Promise<Message> {
		const EMBED_DATA = msg.guild.language.tget('COMMAND_SERVERINFO_EMBED');

		const embed = new MessageEmbed()
			.addFields([
				{ name: EMBED_DATA.FIELD_TITLES.TOTAL_MEMBERS, value: msg.guild!.memberCount, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.BOTS, value: msg.guild!.members.cache.filter(m => m.user.bot).size, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.TEXT_CHANNELS, value: msg.guild!.channels.cache.filter(c => c.type === 'text').size, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.VOICE_CHANNELS, value: msg.guild!.channels.cache.filter(c => c.type === 'voice').size, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.ROLES, value: msg.guild!.roles.cache.size, inline: true },
				{ name: EMBED_DATA.FIELD_TITLES.EMOJIS, value: msg.guild!.emojis.cache.size, inline: true }
			])
			.setAuthor(msg.guild.name, msg.guild.iconURL()!)
			.setFooter(EMBED_DATA.FOOTER(formatDate(msg.guild!.createdTimestamp), friendlyDuration(Date.now() - msg.guild!.createdTimestamp)))
			.setTimestamp();

		return msg.channel.send(embed);
	}

}
