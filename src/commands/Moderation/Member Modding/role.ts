import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { Message, Role, User } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_ROLE_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_ROLE_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			usage: '<user:username> <role:rolename> [...]'
		});
	}

	public async run(msg: KlasaMessage, [user, ...roles]: [User, Role]): Promise<Message> {
		const member = await msg.guild!.members.fetch(user);
		if (!member) return msg.channel.send(msg.guild!.language.tget('USER_NOT_IN_GUILD', user.tag));

		const removed: string[] = [];
		const added: string[] = [];

		for (const role of roles) {
			if (member.roles.cache.has(role.id)) {
				await member.roles.remove(role);
				removed.push(role.name);
			} else {
				await member.roles.add(role);
				added.push(role.name);
			}
		}

		let output = '';
		if (added.length) output += `${msg.guild!.language.tget('COMMAND_ROLE_ADD', added.join(', '))}\n`;
		if (removed.length) output += `${msg.guild!.language.tget('COMMAND_ROLE_REMOVE', removed.join(', '))}\n`;

		return msg.channel.send(output);
	}

}
