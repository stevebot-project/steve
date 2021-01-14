import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { richDisplayList } from '@utils/util';
import { Message, MessageEmbed, Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandManageRestrictedRolesDescription'),
	extendedHelp: lang => lang.tget('commandManageRestrictedRolesExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	subcommands: true,
	usage: '<reset|show|manage:default> (role:rolename) [...]'
})
@CreateResolvers([
	[
		'rolename',
		(str, possible, msg, [action]) => action === 'manage'
			? msg.client.arguments.get('rolename').run(str, possible, msg)
			: null
	]
])
export default class extends SteveCommand {

	public async manage(msg: GuildMessage, roles: Role[]): Promise<Message> {
		const restrictedRoles = msg.guild.settings.get(GuildSettings.Roles.Restricted) as string[];

		const removedRoles: string[] = [];
		const addedRoles: string[] = [];

		for (const role of roles) {
			restrictedRoles.includes(role.id) ? removedRoles.push(role.name) : addedRoles.push(role.name);

			await msg.guild.settings.update(GuildSettings.Roles.Restricted, role.id, msg.guild.id);
		}

		let res = '';

		if (removedRoles.length) {
			res += msg.guild.language.tget('commandManageRestrictedRolesManageRemoved', removedRoles.join(', '));
		}

		if (addedRoles.length) {
			res += msg.guild.language.tget('commandManageRestrictedRolesManageAdded', addedRoles.join(', '));
		}

		return msg.channel.send(res);
	}

	public async reset(msg: GuildMessage): Promise<Message> {
		await msg.guild.settings.reset(GuildSettings.Roles.Restricted);

		return msg.channel.send(msg.guild.language.tget('commandManageRestrictedRolesReset'));
	}

	public async show(msg: GuildMessage): Promise<Message> {
		const restrictedRoles = msg.guild.settings.get(GuildSettings.Roles.Restricted) as string[];
		if (!restrictedRoles.length) return msg.channel.send(msg.guild.language.tget('commandManageRestrictedrolesShowNoRoles'));

		const res = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const restrictedRoleNames: string[] = [];

		restrictedRoles.forEach(snowflake => {
			const role = msg.guild.roles.cache.get(snowflake)!; // TODO: fix role undefined bug here
			restrictedRoleNames.push(role.name ?? msg.guild.language.tget('commandManageRestrictedrolesShowRoleNotFound'));
		});

		const display = richDisplayList(restrictedRoleNames, 30);

		await display.run(res);
		return res;
	}

}
