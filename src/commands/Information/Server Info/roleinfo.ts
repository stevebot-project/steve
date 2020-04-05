import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Role, Message } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { newEmbed, formatDate } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['membersin'],
			description: 'Gives information about a role, including a list of the members who have it.',
			examples: ['roleinfo gmt-4', 'roleinfo cygnus'],
			extendedHelp: 'You cannot use this command on roles that have been designated as private by a mod or admin.',
			runIn: ['text'],
			usage: '<role:publicrole>',
			helpUsage: 'role'
		});

		this
			.createCustomResolver('publicrole', async (str, possible, msg) => {
				const role = await this.client.arguments.get('rolename').run(str, possible, msg) as Role;

				if (role.private && !msg.member.isStaff) {
					throw `This role is private; you do not have permission to see info about it.`;
				}

				return role;
			});
	}

	public async run(msg: KlasaMessage, [role]: [Role]): Promise<Message> {
		let membersList = role.members.map(m => m.user.username).join(', ');
		membersList = membersList.length < 1 ? 'No members in this role.'
			: membersList.length > 1024 ? 'There\'s too many members in this role to display.' : membersList;

		const assignable = msg.guild.settings.get(GuildSettings.Roles.Assignable).includes(role.id);
		const created = formatDate(role.createdTimestamp);

		const embed = newEmbed()
			.setDescription(`The ${role.name} role was created on ${created}.`)
			.setColor(role.hexColor)
			.setFooter(`This role is ${assignable ? '' : 'not'} self-assignable.`)
			.setTimestamp()
			.addFields([
				{ name: `${role.members.size}`, value: membersList }
			]);

		return msg.channel.send(embed);
	}

}
