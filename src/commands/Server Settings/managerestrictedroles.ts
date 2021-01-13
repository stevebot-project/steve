import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { richDisplayList } from '@utils/util';
import { Message, MessageEmbed, Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandManagerestrictedrolesDescription'),
	extendedHelp: lang => lang.tget('commandManagerestrictedrolesExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	subcommands: true,
	usage: '<reset|show|manage:default> (role:rolename) [...]'
})
export default class extends SteveCommand {

	public async init() {
		this.createCustomResolver('rolename', (str, possible, msg, [action]) => action === 'manage'
			? this.client.arguments.get('rolename').run(str, possible, msg)
			: null);
	}

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
			res += msg.guild.language.tget('commandManagerestrictedrolesManageRemoved', removedRoles.join(', '));
		}

		if (addedRoles.length) {
			res += msg.guild.language.tget('commandManagerestrictedrolesManageAdded', addedRoles.join(', '));
		}

		return msg.channel.send(res);
	}

	public async reset(msg: GuildMessage): Promise<Message> {
		await msg.guild.settings.reset(GuildSettings.Roles.Restricted);

		return msg.channel.send(msg.guild.language.tget('commandManagerestrictedrolesReset'));
	}

	public async show(msg: GuildMessage): Promise<Message> {
		const restrictedRoles = msg.guild.settings.get(GuildSettings.Roles.Restricted) as string[];
		if (!restrictedRoles.length) return msg.channel.send(msg.guild.language.tget('commandManagerestrictedrolesShowNoroles'));

		const res = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const restrictedRoleNames: string[] = [];

		restrictedRoles.forEach(snowflake => {
			const role = msg.guild.roles.cache.get(snowflake)!;
			restrictedRoleNames.push(role.name ?? msg.guild.language.tget('commandManagerestrictedrolesShowRolenotfound'));
		});

		const display = richDisplayList(restrictedRoleNames, 30);

		await display.run(res);
		return res;
	}

}
