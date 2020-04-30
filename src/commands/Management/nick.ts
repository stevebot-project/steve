import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, Message } from 'discord.js';
import { PermissionLevels } from '@lib/types/enums';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_NICK_DESCRIPTION'),
			examples: ['nick stevebot|stevey', 'nick stevebot'],
			extendedHelp: lang => lang.get('COMMAND_NICK_EXTENDEDHELP'),
			permissionLevel: PermissionLevels.MODERATOR,
			requiredPermissions: ['MANAGE_NICKNAMES'],
			usage: '<targetMember:membername> [newNickname:string{,32}]',
			helpUsage: 'member | (new nickname)'
		});
	}

	public async run(msg: KlasaMessage, [targetMember, nick]: [GuildMember, string]): Promise<GuildMember | Message> {
		if (!nick) nick = '';

		return targetMember.setNickname(nick).catch(e => msg.channel.send(`Unable to change nickname: **${e}**`));
	}

}
