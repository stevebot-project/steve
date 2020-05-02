import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, TextChannel, Message } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_MUTE_DESCRIPTION'),
			duration: true,
			examples: ['mute enchtest', 'mute enchtest|spamming', 'mute enchtest|10 minutes'],
			requiredPermissions: ['MANAGE_ROLES'],
			requiredSettings: ['roles.muted'],
			targetType: 'member',
			helpUsage: 'member | (reason) | (duration)'
		});
	}

	public async handle(msg: KlasaMessage, target: GuildMember, reason: string): Promise<string> {
		await msg.guild.moderation.mute(target, reason || '');
		return 'unmute';
	}

	public posthandle(channel: TextChannel, target: GuildMember): Promise<Message> {
		return channel.send(`${target.user.tag} has been muted.`);
	}

}
