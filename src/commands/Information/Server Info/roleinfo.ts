import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Role, Message } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { newEmbed, formatDate } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['membersin'],
			description: lang => lang.get('COMMAND_ROLEINFO_DESCRIPTION'),
			examples: ['roleinfo gmt-4', 'roleinfo cygnus'],
			extendedHelp: lang => lang.get('COMMAND_ROLEINFO_EXTENDEDHELP'),
			runIn: ['text'],
			usage: '<role:publicrole>',
			helpUsage: 'role'
		});

		this
			.createCustomResolver('publicrole', async (str, possible, msg) => {
				const role = await this.client.arguments.get('rolename').run(str, possible, msg) as Role;

				if (role.private && !msg.member.isStaff) {
					throw msg.language.get('COMMAND_ROLEINFO_PRIVATE_ROLE');
				}

				return role;
			});
	}

	public async run(msg: KlasaMessage, [role]: [Role]): Promise<Message> {
		let membersList = role.members.map(m => m.user.username).join(', ');
		membersList = membersList.length < 1 ? msg.language.get('COMMAND_ROLEINFO_NO_MEMBERS')
			: membersList.length > 1024 ? msg.language.get('COMMAND_ROLEINFO_TOO_MANY') : membersList;

		const assignable = msg.guild.settings.get(GuildSettings.Roles.Assignable).includes(role.id);
		const created = formatDate(role.createdTimestamp);

		const embed = newEmbed()
			.setDescription(msg.language.get('COMMAND_ROLENAME_EMBED_DESCRIPTION', role.name, created))
			.setColor(role.hexColor)
			.setFooter(msg.language.get('COMMAND_ROLENAME_EMBED_FOOTER', assignable))
			.setTimestamp()
			.addFields([
				{ name: `${role.members.size}`, value: membersList }
			]);

		return msg.channel.send(embed);
	}

}
