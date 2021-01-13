import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { ApplyOptions } from '@skyra/decorators';
import { Message, Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['crole'],
	description: lang => lang.tget('commandClearRoleDescription'),
	extendedHelp: lang => lang.tget('commandClearRoleExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	requiredPermissions: ['MANAGE_ROLES'],
	usage: '<role:rolename>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [role]: [Role]): Promise<Message> {
		const res = await msg.channel.send(msg.guild.language.tget('working'));
		await msg.guild.members.fetch();
		const { size } = role.members;

		if (size < 1) return res.edit(msg.guild.language.tget('commandClearRoleRoleEmpty', role.name));

		for (const [, member] of role.members) {
			if (member.roles.cache.has(role.id)) await member.roles.remove(role.id);
		}

		return res.edit(msg.guild.language.tget('commandClearRole', size, role.name));
	}

}
