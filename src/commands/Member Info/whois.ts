import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions } from 'klasa';
import { User, Message, MessageEmbed, ColorResolvable } from 'discord.js';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { getJoinDateString, userAccountCreated } from '@utils/UserInfo';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<CommandOptions>({
	aliases: ['member'],
	description: lang => lang.tget('commandWhoIsDescription'),
	extendedHelp: lang => lang.tget('commandWhoIsExtended'),
	requiredPermissions: ['EMBED_LINKS'],
	runIn: ['text'],
	usage: '[user:username]'
})
@CreateResolvers([
	[
		'username',
		(str, possible, msg) => {
			const usernameArgument = msg.client.arguments.get('username');

			return str
				? usernameArgument.run(str, possible, msg)
				: usernameArgument.run(msg.author.tag, possible, msg);
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [user]: [User]): Promise<Message> {
		user = await this.client.users.fetch(user.id);
		const member = await msg.guild.members.fetch(user);
		if (!member) throw msg.guild.language.tget('userNotInGuild', user.tag);

		const accountCreated = userAccountCreated(msg.guild, member.user.createdTimestamp);

		const joinedGuild = getJoinDateString(msg.guild, member.joinedTimestamp!);

		const embedData = msg.guild.language.tget('commandWhoIsEmbed');

		const embed = new MessageEmbed()
			.addFields([
				{ name: embedData.fieldTitles.displayName, value: member.displayName, inline: true },
				{ name: embedData.fieldTitles.accountCreated, value: accountCreated, inline: true },
				{ name: embedData.fieldTitles.joinedGuild, value: joinedGuild, inline: true }
			])
			.setAuthor(user.tag, user.displayAvatarURL())
			.setColor(user.settings.get(UserSettings.EmbedColor) as ColorResolvable || 0x61e3f9)
			.setFooter(embedData.footer(member.id))
			.setTimestamp();

		if (member.roles.cache.size > 1) {
			embed.addFields([
				{
					name: embedData.fieldTitles.roles,
					// eslint-disable-next-line newline-per-chained-call
					value: member.roles.cache.filter(r => r.id !== r.guild.id).sort().array().join(' ')
				}
			]);
		}

		return msg.channel.send(embed);
	}

}
