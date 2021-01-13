import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions } from 'klasa';
import { Message, MessageEmbed } from 'discord.js';
import { friendlyDuration, formatDate } from '@utils/util';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<CommandOptions>({
	aliases: ['serverstats'],
	description: lang => lang.tget('commandServerInfoDescription'),
	extendedHelp: lang => lang.tget('commandServerInfoExtended'),
	requiredPermissions: ['EMBED_LINKS'],
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage): Promise<Message> {
		const embedData = msg.guild.language.tget('commandServerInfoEmbed');

		const embed = new MessageEmbed()
			.addFields([
				{ name: embedData.fieldTitles.totalMembers, value: msg.guild.memberCount, inline: true },
				{ name: embedData.fieldTitles.bots, value: msg.guild.members.cache.filter(m => m.user.bot).size, inline: true },
				{ name: embedData.fieldTitles.textChannels, value: msg.guild.channels.cache.filter(c => c.type === 'text').size, inline: true },
				{ name: embedData.fieldTitles.voiceChannels, value: msg.guild.channels.cache.filter(c => c.type === 'voice').size, inline: true },
				{ name: embedData.fieldTitles.roles, value: msg.guild.roles.cache.size, inline: true },
				{ name: embedData.fieldTitles.emojis, value: msg.guild.emojis.cache.size, inline: true }
			])
			.setAuthor(msg.guild.name, msg.guild.iconURL()!)
			.setFooter(embedData.footer(formatDate(msg.guild.createdTimestamp), friendlyDuration(Date.now() - msg.guild.createdTimestamp)))
			.setTimestamp();

		return msg.channel.send(embed);
	}

}
