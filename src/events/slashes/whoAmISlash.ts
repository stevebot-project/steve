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

			const EMBED_DATA = guild.language.tget('COMMAND_WHOIS_EMBED');

			const embed = new MessageEmbed()
				.addFields([
					{ name: EMBED_DATA.FIELD_TITLES.DISPLAY_NAME, value: fullMember.displayName, inline: true },
					{ name: EMBED_DATA.FIELD_TITLES.ACCOUNT_CREATED, value: accountCreated, inline: true },
					{ name: EMBED_DATA.FIELD_TITLES.JOINED_GUILD, value: joinedGuild, inline: true }
				])
				.setAuthor(fullMember.user.tag, fullMember.user.displayAvatarURL())
				.setColor(fullMember.user.settings.get(UserSettings.EmbedColor) as ColorResolvable || 0x61e3f9)
				.setFooter(EMBED_DATA.FOOTER(fullMember.id))
				.setTimestamp();

			if (fullMember.roles.cache.size > 1) {
				embed.addFields([
					{
						name: EMBED_DATA.FIELD_TITLES.ROLES,
						// eslint-disable-next-line newline-per-chained-call
						value: fullMember.roles.cache.filter(r => r.id !== r.guild.id).sort().array().join(' ')
					}
				]);
			}

			return channel.send(embed);
		}
	}

}
