import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels, Emojis } from '@lib/types/enums';
import { Role, Message, Snowflake } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_ASSIGN_DESCRIPTION'),
			examples: ['assign list', 'assign notification squad', 'assign gmt-4|gmt-5'],
			extendedHelp: lang => lang.get('COMMAND_ASSIGN_EXTENDEDHELP'),
			permissionLevel: PermissionLevels.TRUSTED,
			requiredPermissions: ['MANAGE_ROLES'],
			requiredSettings: ['roles.trusted'],
			runIn: ['text'],
			subcommands: true,
			usage: '<list|assign:default> (role:assignableRole) [...]',
			helpUsage: '*list* OR role (|role|...)'
		});

		this
			.createCustomResolver('assignableRole', async (str, possible, msg, [action]: string[]): Promise<Role> => {
				if (action === 'list') return null;
				if (!str) throw msg.language.get('COMMAND_ASSIGN_INVALID_ROLE');

				const role: Role = await this.client.arguments.get('rolename').run(str, possible, msg);
				const assignable = msg.guild.settings.get(GuildSettings.Roles.Assignable) as Snowflake[];

				if (!assignable.includes(role.id)) throw msg.language.get('COMMAND_ASSIGN_NOT_SELF_ASSIGNABLE', role.name);

				return role;
			});
	}

	public async list(msg: KlasaMessage): Promise<Message> {
		const assignable = msg.guild.settings.get(GuildSettings.Roles.Assignable) as Snowflake[];
		if (assignable.length < 1) throw msg.language.get('COMMAND_ASSIGN_NO_ROLES');

		let list = '';

		for (let i = 0; i < assignable.length; i++) {
			const role = msg.guild.roles.cache.get(assignable[i]);
			list += `${role.name}\n`;
		}

		return msg.channel.send(list);
	}

	public async assign(msg: KlasaMessage, assignableRoles: Role[]): Promise<Message> {
		const removedRoles: string[] = [];
		const addedRoles: string[] = [];

		for (const assignableRole of assignableRoles) {
			const removing = msg.member.roles.cache.has(assignableRole.id);

			if (removing) {
				await msg.member.roles.remove(assignableRole);
				removedRoles.push(assignableRole.name);
			} else {
				await msg.member.roles.add(assignableRole);
				addedRoles.push(assignableRole.name);
			}
		}

		const removedRolesString = removedRoles.length > 0 ? `${Emojis.Minus} Removed role(s): \`${removedRoles.join(', ')}\`.` : null;
		const addedRolesString = addedRoles.length > 0 ? `${Emojis.Plus} Added role(s): \`${addedRoles.join(', ')}\`.` : null;

		return msg.channel.send(`${removedRoles.length ? removedRolesString : ''}\n${addedRoles.length ? addedRolesString : ''}`);
	}

}
