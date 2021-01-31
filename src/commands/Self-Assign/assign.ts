import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions } from 'klasa';
import { Role, Message, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, richDisplayList } from '@utils/util';
import { ApplyOptions, CreateResolvers, requiredPermissions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<CommandOptions>({
	aliases: ['rank'],
	description: lang => lang.tget('commandAssignDescription'),
	extendedHelp: lang => lang.tget('commandAssignExtended'),
	flagSupport: true,
	requiredPermissions: ['MANAGE_ROLES'],
	runIn: ['text'],
	usage: '(role:rolename) [...]'
})
@CreateResolvers([
	[
		'rolename',
		(str, possible, msg) => {
			if (Reflect.has(msg.flagArgs, 'list')) return null;
			if (str) return msg.client.arguments.get('rolename').run(str, possible, msg);
			throw msg.guild!.language.tget('commandAssignNoRoleProvided');
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: GuildMessage, roles: Role[]): Promise<Message | null> {
		if (Reflect.has(msg.flagArgs, 'list')) return this.listAssignableRoles(msg);

		const removed: string[] = [];
		const added: string[] = [];

		for (const role of roles) {
			if (!role.isAssignable) {
				floatPromise(this, msg.channel.send(msg.guild.language.tget('commandAssignNotAssignable', role.name)));
				continue;
			}

			if (msg.member.roles.cache.has(role.id)) {
				await msg.member.roles.remove(role);
				removed.push(role.name);
			} else {
				await msg.member.roles.add(role);
				added.push(role.name);
			}
		}

		let output = '';
		if (added.length) output += `${msg.guild.language.tget('commandAssignRoleAdd', added.join(', '))}\n`;
		if (removed.length) output += `${msg.guild.language.tget('commandAssignRoleRemove', removed.join(', '))}\n`;

		return output ? msg.channel.send(output) : null;
	}

	@requiredPermissions('EMBED_LINKS')
	private async listAssignableRoles(msg: GuildMessage): Promise<Message> {
		let assignables = msg.guild.settings.get(GuildSettings.Roles.Assignable) as string[];
		assignables = assignables.slice(); // clone to avoid mutating cache

		const roleNames: string[] = [];

		for (let i = 0; i < assignables.length; i++) {
			const role = msg.guild.roles.cache.get(assignables[i]);

			if (role) roleNames.push(role.name);
		}

		if (!roleNames.length) throw msg.guild.language.tget('commandManageAssignableRolesShowNoRoles');

		const response = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const display = richDisplayList(roleNames, 30);

		await display.run(response);
		return response;
	}

}
