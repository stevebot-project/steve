import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, TextChannel, User } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_UNBAN_DESCRIPTION'),
			duration: true,
			examples: ['unban 299587268363157506'],
			requiredPermissions: ['BAN_MEMBERS'],
			targetType: 'user',
			helpUsage: 'user'
		});
	}

	public async handle(msg: KlasaMessage, target: User): Promise<string> {
		await msg.guild.moderation.unban(target);
		return 'unban';
	}

	public posthandle(channel: TextChannel, target: User): Promise<Message> {
		return channel.send(`${target.tag} has been unbanned.`);
	}

}
