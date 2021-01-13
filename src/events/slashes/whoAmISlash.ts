import { UserSettings } from '@lib/types/settings/UserSettings';
import { getJoinDateString, userAccountCreated } from '@utils/UserInfo';
import { ColorResolvable, Guild, GuildChannel, MessageEmbed } from 'discord.js';
import { Event } from 'klasa';
import { InteractionCreatePacketMember } from '../interactionCreate';

export default class extends Event {

	public async run(guild: Guild, channel: GuildChannel, member: InteractionCreatePacketMember) {
		if (channel.isText()) {
			const fullMember = await guild.members.fetch(member.user.id);
			const accountCreated = userAccountCreated(guild, fullMember.user.createdTimestamp);
			const joinedGuild = getJoinDateString(guild, fullMember.joinedTimestamp!);

			const embedData = guild.language.tget('commandWhoIsEmbed');

			const embed = new MessageEmbed()
				.addFields([
					{ name: embedData.fieldTitles.displayName, value: fullMember.displayName, inline: true },
					{ name: embedData.fieldTitles.accountCreated, value: accountCreated, inline: true },
					{ name: embedData.fieldTitles.joinedGuild, value: joinedGuild, inline: true }
				])
				.setAuthor(fullMember.user.tag, fullMember.user.displayAvatarURL())
				.setColor(fullMember.user.settings.get(UserSettings.EmbedColor) as ColorResolvable || 0x61e3f9)
				.setFooter(embedData.footer(fullMember.id))
				.setTimestamp();

			if (fullMember.roles.cache.size > 1) {
				embed.addFields([
					{
						name: embedData.fieldTitles.roles,
						// eslint-disable-next-line newline-per-chained-call
						value: fullMember.roles.cache.filter(r => r.id !== r.guild.id).sort().array().join(' ')
					}
				]);
			}

			return channel.send(embed);
		}
	}

}
