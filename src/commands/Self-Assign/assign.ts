import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage, RichDisplay } from 'klasa';
import { Role, Message, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { chunk } from '@klasa/utils';
import { floatPromise } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_ASSIGN_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_ASSIGN_EXTENDED'),
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			subcommands: true,
			usage: '<list|role:default> (role:rolename) [...]'
		});

		this.createCustomResolver('rolename', (str, possible, msg, [action]) => action === 'list' ? null : this.client.arguments.get('rolename').run(str, possible, msg));
	}

	public async list(msg: KlasaMessage): Promise<Message> {
		let assignables = msg.guild!.settings.get(GuildSettings.Roles.Assignable) as string[];
		assignables = assignables.slice(); // clone to avoid mutating cache

		// make assignables into an array of role names
		for (let i = 0; i < assignables.length; i++) {
			const role = msg.guild!.roles.cache.get(assignables[i]);
			if (role) assignables.splice(i, 1, role.name);
		}

		const response = await msg.send(new MessageEmbed()
			.setDescription('Loading...'));

		const display = new RichDisplay(new MessageEmbed());

		for (const page of chunk(assignables, 30)) {
			const description = `\`${page.join('`, `')}\``;
			display.addPage((embed: MessageEmbed) => embed.setDescription(description));
		}

		await display.run(response);
		return response;
	}

	public async role(msg: KlasaMessage, roles: Role[]): Promise<Message | null> {
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

}
