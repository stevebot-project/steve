import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { richDisplayList } from '@utils/util';
import { Message, MessageEmbed, Role } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_MANAGERESTRICTEDROLES_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_MANAGERESTRICTEDROLES_EXTENDED'),
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
		const restrictedRoles = msg.guild!.settings.get(GuildSettings.Roles.Restricted) as string[];

		const removedRoles: string[] = [];
		const addedRoles: string[] = [];

		for (const role of roles) {
			restrictedRoles.includes(role.id) ? removedRoles.push(role.name) : addedRoles.push(role.name);

			await msg.guild!.settings.update(GuildSettings.Roles.Restricted, role.id, msg.guild!.id);
		}

		let res = '';

		if (removedRoles.length) {
			res += msg.guild!.language.tget('COMMAND_MANAGERESTRICTEDROLES_MANAGE_REMOVED', removedRoles.join(', '));
		}

		if (addedRoles.length) {
			res += msg.guild!.language.tget('COMMAND_MANAGERESTRICTEDROLES_MANAGE_ADDED', addedRoles.join(', '));
		}

		return msg.channel.send(res);
	}

	public async reset(msg: KlasaMessage): Promise<Message> {
		await msg.guild!.settings.reset(GuildSettings.Roles.Restricted);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_MANAGERESTRICTEDROLES_RESET'));
	}

	public async show(msg: KlasaMessage): Promise<Message> {
		const restrictedRoles = msg.guild!.settings.get(GuildSettings.Roles.Restricted) as string[];
		if (!restrictedRoles.length) return msg.channel.send(msg.guild!.language.tget('COMMAND_MANAGERESTRICTEDROLES_SHOW_NOROLES'));

		const res = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const restrictedRoleNames: string[] = [];

		restrictedRoles.forEach(snowflake => {
			const role = msg.guild!.roles.cache.get(snowflake)!;
			restrictedRoleNames.push(role.name ?? msg.guild!.language.tget('COMMAND_MANAGERESTRICTEDROLES_SHOW_ROLENOTFOUND'));
		});

		const display = richDisplayList(restrictedRoleNames, 30);

		await display.run(res);
		return res;
	}

}
