import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Role, Message, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, richDisplayList } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_ASSIGN_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_ASSIGN_EXTENDED'),
			flagSupport: true,
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			usage: '(role:rolename) [...]'
		});

		this.createCustomResolver('rolename', (str, possible, msg) => {
			if (Reflect.has(msg.flagArgs, 'list')) return null;
			if (str) return this.client.arguments.get('rolename').run(str, possible, msg);
			throw msg.guild!.language.tget('COMMAND_ASSIGN_NOROLEPROVIDED');
		});
	}

	public async run(msg: KlasaMessage, roles: Role[]): Promise<Message | null> {
		if (Reflect.has(msg.flagArgs, 'list')) return this.listAssignableRoles(msg);

		const trustedRoleID = msg.guild!.settings.get(GuildSettings.Roles.Trusted);
		const trustedRoleRequirement = msg.guild!.settings.get(GuildSettings.Roles.RequireTrustedRoleForSelfAssign) as boolean;

		if (trustedRoleID && trustedRoleRequirement && !msg.member!.roles.cache.has(trustedRoleID)) {
			throw msg.guild!.language.tget('COMMAND_ASSIGN_ROLE_NEEDTRUSTED', msg.guild!.roles.cache.get(trustedRoleID)!.name);
		}

		const removed: string[] = [];
		const added: string[] = [];

		for (const role of roles) {
			if (!role.isAssignable) {
				floatPromise(this, msg.channel.send(msg.guild!.language.tget('COMMAND_ASSIGN_NOTASSIGNABLE', role.name)));
				continue;
			}

			if (msg.member!.roles.cache.has(role.id)) {
				await msg.member!.roles.remove(role);
				removed.push(role.name);
			} else {
				await msg.member!.roles.add(role);
				added.push(role.name);
			}
		}

		let output = '';
		if (added.length) output += `${msg.guild!.language.tget('COMMAND_ASSIGN_ROLE_ADD', added.join(', '))}\n`;
		if (removed.length) output += `${msg.guild!.language.tget('COMMAND_ASSIGN_ROLE_REMOVE', removed.join(', '))}\n`;

		return output ? msg.channel.send(output) : null;
	}

	private async listAssignableRoles(msg: KlasaMessage): Promise<Message> {
		let assignables = msg.guild!.settings.get(GuildSettings.Roles.Assignable) as string[];
		assignables = assignables.slice(); // clone to avoid mutating cache

		// make assignables into an array of role names
		for (let i = 0; i < assignables.length; i++) {
			const role = msg.guild!.roles.cache.get(assignables[i]);
			if (role) assignables.splice(i, 1, role.name);
		}

		const response = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const display = richDisplayList(assignables, 30);

		await display.run(response);
		return response;
	}

}
