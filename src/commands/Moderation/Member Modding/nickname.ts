import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { ApplyOptions } from '@skyra/decorators';
import { Message, User } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['nick'],
	description: lang => lang.tget('COMMAND_NICKNAME_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_NICKNAME_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_NICKNAMES'],
	runIn: ['text'],
	usage: '<user:username> [nickname:string]'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [user, nickname]: [User, string]): Promise<Message> {
		const member = await msg.guild.members.fetch(user);
		if (!member) return msg.channel.send(msg.guild.language.tget('USER_NOT_IN_GUILD', user.tag));

		await member.setNickname(nickname);

		return msg.channel.send(nickname
			? msg.guild.language.tget('COMMAND_NICKNAME_SET', user.tag)
			: msg.guild.language.tget('COMMAND_NICKNAME_CLEARED', user.tag));
	}

}
