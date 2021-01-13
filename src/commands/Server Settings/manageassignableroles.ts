import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message, Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandManageAssignableRolesDescription'),
	extendedHelp: lang => lang.tget('commandManageAssignableRolesExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	subcommands: true,
	usage: '<reset|manage:default> (role:rolename) [...]'
})
export default class extends SteveCommand {

	public async init() {
		this.createCustomResolver('rolename', (str, possible, msg, [action]) => action === 'manage'
			? this.client.arguments.get('rolename').run(str, possible, msg)
			: null);
	}

	public async manage(msg: GuildMessage, roles: Role[]): Promise<Message> {
		const assignableRoles = msg.guild.settings.get(GuildSettings.Roles.Assignable) as string[];

		const removedRoles: string[] = [];
		const addedRoles: string[] = [];

		for (const role of roles) {
			assignableRoles.includes(role.id) ? removedRoles.push(role.name) : addedRoles.push(role.name);

			await msg.guild.settings.update(GuildSettings.Roles.Assignable, role.id, msg.guild.id);
		}

		let res = '';

		if (removedRoles.length) {
			res += msg.guild.language.tget('commandManageAssignableRolesManageRemoved', removedRoles.join(', '));
		}

		if (addedRoles.length) {
			res += msg.guild.language.tget('commandManageAssignableRolesManageAdded', addedRoles.join(', '));
		}

		return msg.channel.send(res);
	}

	public async reset(msg: GuildMessage): Promise<Message> {
		await msg.guild.settings.reset(GuildSettings.Roles.Assignable);

		return msg.channel.send(msg.guild.language.tget('commandManageAssignableRolesReset'));
	}

}
