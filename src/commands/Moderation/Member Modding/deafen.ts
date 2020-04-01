import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, TextChannel, Message } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Adds the server\'s deafened role to the specified member.',
			duration: true,
			examples: ['deafen enchtest', 'deafen enchtest|being annoying', 'deafen enchtest|being annoying|10 minutes'],
			requiredPermissions: ['MANAGE_ROLES'],
			requiredSettings: ['roles.deafened'],
			targetType: 'member',
			helpUsage: 'member | (reason) | (duration)'
		});
	}

	public async handle(msg: KlasaMessage, target: GuildMember, reason: string): Promise<string> {
		await msg.guild.moderation.deafen(target, reason || '');
		return 'undeafen';
	}

	public posthandle(channel: TextChannel, target: GuildMember): Promise<Message> {
		return channel.send(`${target.user.tag} has been deafened.`);
	}

}
