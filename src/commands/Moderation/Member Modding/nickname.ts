import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { ApplyOptions } from '@skyra/decorators';
import { Message, User } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['nick'],
	description: lang => lang.tget('commandNicknameDescription'),
	extendedHelp: lang => lang.tget('commandNicknameExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_NICKNAMES'],
	runIn: ['text'],
	usage: '<user:username> [nickname:string{,32}]'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [user, nickname]: [User, string]): Promise<Message> {
		const member = await msg.guild.members.fetch(user);
		if (!member) return msg.channel.send(msg.guild.language.tget('userNotInGuild', user.tag));

		try {
			await member.setNickname(nickname);

			return msg.channel.send(nickname
				? msg.guild.language.tget('commandNicknameSet', user.tag)
				: msg.guild.language.tget('commandNicknameCleared', user.tag));
		} catch (err) {
			return msg.channel.send(msg.guild.language.tget('commandNicknameUnableToSet', err, user.tag));
		}
	}

}
