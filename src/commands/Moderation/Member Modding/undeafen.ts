import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, TextChannel, Message } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Removes the server\'s deafened role from the specified member.',
			duration: true,
			examples: ['undeafen enchtest'],
			requiredPermissions: ['MANAGE_ROLES'],
			requiredSettings: ['roles.deafened'],
			targetType: 'member',
			helpUsage: 'member'
		});
	}

	public async handle(msg: KlasaMessage, target: GuildMember): Promise<string> {
		await msg.guild.moderation.undeafen(target);
		return 'undeafen';
	}

	public posthandle(channel: TextChannel, target: GuildMember): Promise<Message> {
		return channel.send(`${target.user.tag} has been undeafened.`);
	}

}
