import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, TextChannel, Message } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_KICK_DESCRIPTION'),
			examples: ['kick enchtest', 'kick enchtest|link spamming'],
			requiredPermissions: ['KICK_MEMBERS'],
			targetType: 'member',
			helpUsage: 'member | (reason)'
		});
	}

	public async handle(msg: KlasaMessage, target: GuildMember, reason: string): Promise<string> {
		await msg.guild.moderation.kick(target, reason || '');
		return '';
	}

	public posthandle(channel: TextChannel, target: GuildMember): Promise<Message> {
		return channel.send(`${target.user.tag} has been kicked.`);
	}

}
