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
	description: lang => lang.tget('COMMAND_ROLEINFO_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_ROLEINFO_EXTENDED'),
	runIn: ['text'],
	usage: '<role:rolename>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [role]: [Role]): Promise<Message> {
		if (role.isRestricted && !msg.member.isStaff) throw msg.guild.language.tget('COMMAND_ROLEINFO_RESTRICTED');

		let membersList = role.members.map(m => m.user.username).join(', ');

		membersList = membersList.length < 1
			? msg.guild.language.tget('COMMAND_ROLEINFO_NOMEMBERS')
			: membersList.length > 1024
				? msg.guild.language.tget('COMMAND_ROLEINFO_TOOMANY')
				: membersList;

		let aliases: RoleAlias[] = msg.guild.settings.get(GuildSettings.RoleAliases);
		const roleHasAlias = aliases.some(a => a.role === role.id);
		if (roleHasAlias) {
			aliases = aliases.filter(a => a.role === role.id);
		}

		const EMBED_DATA = msg.guild.language.tget('COMMAND_ROLEINFO_EMBED');

		const embed = new MessageEmbed()
			.addFields([
				{ name: EMBED_DATA.FIELD_TITLES.MEMBERS(role.members.size), value: membersList }
			])
			.setColor(role.hexColor)
			.setDescription(EMBED_DATA.DESCRIPTION(role.name, formatDate(role.createdTimestamp)))
			.setFooter(EMBED_DATA.FOOTER(role.isAssignable))
			.setTimestamp();

		if (roleHasAlias) embed.addFields({ name: EMBED_DATA.FIELD_TITLES.ALIASES, value: aliases.map(a => a.alias).join(', ') });

		return msg.channel.send(embed);
	}

}
