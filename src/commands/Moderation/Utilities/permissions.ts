import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions } from 'klasa';
import { PermissionsLevels } from '@lib/types/Enums';
import { User, Message, Permissions, PermissionString, MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

const PERM_FLAGS = Object.keys(Permissions.FLAGS) as PermissionString[];

@ApplyOptions<CommandOptions>({
	aliases: ['perms'],
	description: lang => lang.tget('commandPermissionsDescription'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['EMBED_LINKS'],
	runIn: ['text'],
	usage: '<user:username>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [user]: [User]): Promise<Message> {
		const member = await msg.guild.members.fetch(user);
		if (!member) throw msg.guild.language.tget('userNotInGuild', user.tag);

		const { permissions } = member;
		const permList: string[] = [];

		if (permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			permList.push(msg.guild.language.tget('commandPermissionsHasAll', user.tag));
		} else {
			for (const flag of PERM_FLAGS) {
				if (permissions.has(flag)) permList.push(`🔹 ${msg.guild.language.PERMISSIONS[flag]}`);
			}
		}

		const embed = new MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL())
			.setDescription(permList.join('\n'));

		return msg.channel.send(embed);
	}

}
