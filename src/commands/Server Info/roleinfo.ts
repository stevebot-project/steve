import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions } from 'klasa';
import { Role, Message, MessageEmbed } from 'discord.js';
import { formatDate } from '@utils/util';
import { RoleAlias } from '../Role Aliases/rolealias';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<CommandOptions>({
	aliases: ['membersin'],
	description: lang => lang.tget('commandRoleInfoDescription'),
	extendedHelp: lang => lang.tget('commandRoleInfoExtended'),
	requiredPermissions: ['EMBED_LINKS'],
	runIn: ['text'],
	usage: '<role:rolename>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [role]: [Role]): Promise<Message> {
		if (role.isRestricted && !msg.member.isStaff) throw msg.guild.language.tget('commandRoleInfoRestricted');

		let membersList = role.members.map(m => m.user.username).join(', ');

		membersList = membersList.length < 1
			? msg.guild.language.tget('commandRoleInfoNoMembers')
			: membersList.length > 1024
				? msg.guild.language.tget('commandRoleInfoTooMany')
				: membersList;

		let aliases: RoleAlias[] = msg.guild.settings.get(GuildSettings.RoleAliases);
		const roleHasAlias = aliases.some(a => a.role === role.id);
		if (roleHasAlias) {
			aliases = aliases.filter(a => a.role === role.id);
		}

		const embedData = msg.guild.language.tget('commandRoleInfoEmbed');

		const embed = new MessageEmbed()
			.addFields([
				{ name: embedData.fieldTitles.members(role.members.size), value: membersList }
			])
			.setColor(role.hexColor)
			.setDescription(embedData.description(role.name, formatDate(role.createdTimestamp)))
			.setFooter(embedData.footer(role.isAssignable))
			.setTimestamp();

		if (roleHasAlias) embed.addFields({ name: embedData.fieldTitles.aliases, value: aliases.map(a => a.alias).join(', ') });

		return msg.channel.send(embed);
	}

}
