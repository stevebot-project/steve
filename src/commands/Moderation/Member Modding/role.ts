import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { ApplyOptions } from '@skyra/decorators';
import { Message, Role, User } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandRoleDescription'),
	extendedHelp: lang => lang.tget('commandRoleExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_ROLES'],
	runIn: ['text'],
	usage: '<user:username> <role:rolename> [...]'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [user, ...roles]: [User, Role]): Promise<Message> {
		const member = await msg.guild.members.fetch(user);
		if (!member) return msg.channel.send(msg.guild.language.tget('userNotInGuild', user.tag));

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
		if (added.length) output += `${msg.guild.language.tget('commandRoleAdd', added.join(', '))}\n`;
		if (removed.length) output += `${msg.guild.language.tget('commandRoleRemove', removed.join(', '))}\n`;

		return msg.channel.send(output);
	}

}
