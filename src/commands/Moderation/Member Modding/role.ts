import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message, Role, User } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_ROLE_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_ROLE_EXTENDED'),
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			usage: '<user:username> <role:rolename>'
		});
	}

	public async run(msg: KlasaMessage, [user, role]: [User, Role]): Promise<Message> {
		const member = await msg.guild!.members.fetch(user);
		if (!member) return msg.channel.send(msg.guild!.language.tget('USER_NOT_IN_GUILD', user.tag));

		let res = '';
		if (member.roles.cache.has(role.id)) {
			await member.roles.remove(role);
			res += msg.guild!.language.tget('COMMAND_ROLE_REMOVE', user.tag, role.name);
		} else {
			await member.roles.add(role);
			res += msg.guild!.language.tget('COMMAND_ROLE_ADD', user.tag, role.name);
		}

		return msg.channel.send(res);
	}

}
