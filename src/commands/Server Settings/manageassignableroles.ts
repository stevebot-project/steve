import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { richDisplayList } from '@utils/util';
import { Message, MessageEmbed, Role } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_MANAGEASSIGNABLEROLES_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_MANAGEASSIGNABLEROLES_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text'],
			subcommands: true,
			usage: '<reset|show|manage:default> (role:rolename) [...]'
		});

		this.createCustomResolver('rolename', (str, possible, msg, [action]) => action === 'manage'
			? this.client.arguments.get('rolename').run(str, possible, msg)
			: null);
	}

	public async manage(msg: KlasaMessage, roles: Role[]): Promise<Message> {
		const assignableRoles = msg.guild!.settings.get(GuildSettings.Roles.Assignable) as string[];

		const removedRoles: string[] = [];
		const addedRoles: string[] = [];

		for (const role of roles) {
			assignableRoles.includes(role.id) ? removedRoles.push(role.name) : addedRoles.push(role.name);

			await msg.guild!.settings.update(GuildSettings.Roles.Assignable, role.id, msg.guild!.id);
		}

		let res = '';

		if (removedRoles.length) {
			res += msg.guild!.language.tget('COMMAND_MANAGEASSIGNABLEROLES_MANAGE_REMOVED', removedRoles.join(', '));
		}

		if (addedRoles.length) {
			res += msg.guild!.language.tget('COMMAND_MANAGEASSIGNABLEROLES_MANAGE_ADDED', addedRoles.join(', '));
		}

		return msg.channel.send(res);
	}

	public async reset(msg: KlasaMessage): Promise<Message> {
		await msg.guild!.settings.reset(GuildSettings.Roles.Assignable);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_MANAGEASSIGNABLEROLES_RESET'));
	}

	public async show(msg: KlasaMessage): Promise<Message> {
		const assignableRoles = msg.guild!.settings.get(GuildSettings.Roles.Assignable) as string[];
		if (!assignableRoles.length) return msg.channel.send(msg.guild!.language.tget('COMMAND_MANAGEASSIGNABLEROLES_SHOW_NOROLES'));

		const res = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const assignableRolesNames: string[] = [];

		assignableRoles.forEach(snowflake => {
			const role = msg.guild!.roles.cache.get(snowflake)!;
			assignableRolesNames.push(role.name ?? msg.guild!.language.tget('COMMAND_MANAGEASSIGNABLEROLES_SHOW_ROLENOTFOUND'));
		});

		const display = richDisplayList(assignableRolesNames, 30);

		await display.run(res);
		return res;
	}

}
