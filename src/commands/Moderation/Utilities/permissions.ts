import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionsLevels } from '@lib/types/Enums';
import { User, Message, Permissions, PermissionString, MessageEmbed } from 'discord.js';

const PERM_FLAGS = Object.keys(Permissions.FLAGS) as PermissionString[];

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['perms'],
			description: lang => lang.tget('COMMAND_PERMISSIONS_DESCRIPTION'),
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text'],
			usage: '<user:username>'
		});
	}

	public async run(msg: KlasaMessage, [user]: [User]): Promise<Message> {
		const member = await msg.guild!.members.fetch(user);
		if (!member) throw msg.guild!.language.tget('USER_NOT_IN_GUILD', user.tag);

		const { permissions } = member;
		const permList: string[] = [];

		if (permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			permList.push(msg.guild!.language.tget('COMMAND_PERMISSIONS_HAS_ALL', user.tag));
		} else {
			for (const flag of PERM_FLAGS) {
				if (permissions.has(flag)) permList.push(`🔹 ${msg.guild!.language.PERMISSIONS[flag]}`);
			}
		}

		const embed = new MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL())
			.setDescription(permList.join('\n'));

		return msg.channel.send(embed);
	}

}
