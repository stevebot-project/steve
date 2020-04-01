import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, Message, TextChannel } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Bans a member from the server.',
			duration: true,
			examples: ['ban enchtest', 'ban enchtest|using slurs', 'ban enchtest|trolling|1 day'],
			requiredPermissions: ['BAN_MEMBERS'],
			targetType: 'member',
			helpUsage: 'member | (reason) | (duration)'
		});
	}

	public async handle(msg: KlasaMessage, target: GuildMember, reason: string): Promise<string> {
		await msg.guild.moderation.ban(target, reason || '');
		return 'unban';
	}

	public posthandle(channel: TextChannel, target: GuildMember): Promise<Message> {
		return channel.send(`${target.user.tag} has been banned.`);
	}

}
