import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { Message, Role } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['crole'],
	description: lang => lang.tget('COMMAND_CLEARROLE_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_CLEARROLE_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	requiredPermissions: ['MANAGE_ROLES'],
	usage: '<role:rolename>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [role]: [Role]): Promise<Message> {
		const res = await msg.channel.send(msg.guild!.language.tget('WORKING'));
		await msg.guild!.members.fetch();
		const { size } = role.members;

		if (size < 1) return res.edit(msg.guild!.language.tget('COMMAND_CLEARROLE_ROLE_EMPTY', role.name));

		for (const [, member] of role.members) {
			if (member.roles.cache.has(role.id)) await member.roles.remove(role.id);
		}

		return res.edit(msg.guild!.language.tget('COMMAND_CLEARROLE', size, role.name));
	}

}
