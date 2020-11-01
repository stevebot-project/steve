import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { Message, Role } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['crole'],
			description: lang => lang.tget('COMMAND_CLEARROLE_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_CLEARROLE_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text'],
			requiredPermissions: ['MANAGE_ROLES'],
			usage: '<role:rolename>'
		});
	}

	public async run(msg: KlasaMessage, [role]: [Role]): Promise<Message> {
		const res = await msg.channel.send(msg.guild!.language.tget('WORKING'));
		await msg.guild!.members.fetch();
		const { size } = role.members;

		if (size < 1) return res.edit(msg.guild!.language.tget('COMMAND_CLEARROLE_ROLE_EMPTY', role.name));

		// @ts-expect-error 6133
		for (const [id, member] of role.members) { // eslint-disable-line @typescript-eslint/no-unused-vars
			if (member.roles.cache.has(role.id)) await member.roles.remove(role.id);
		}

		return res.edit(msg.guild!.language.tget('COMMAND_CLEARROLE', size, role.name));
	}

}
