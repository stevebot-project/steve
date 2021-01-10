import { ModerationCommand, ModerationCommandOptions } from '@lib/structures/commands/ModerationCommand';
import { User, Guild, GuildMember, Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<ModerationCommandOptions>({
	description: lang => lang.tget('COMMAND_KICK_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_KICK_EXTENDED'),
	requiredPermissions: ['KICK_MEMBERS']
})
export default class extends ModerationCommand {

	public async prehandle(target: User, guild: Guild): Promise<GuildMember> {
		const member = await guild.members.fetch(target);
		if (!member) throw guild.language.tget('USER_NOT_IN_GUILD', target.tag);
		return member;
	}

	public async handle(msg: GuildMessage, target: GuildMember, reason: string): Promise<GuildMember> {
		try {
			await msg.guild.moderation.kick(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.guild.language.tget('COMMAND_KICK_UNABLE', target.user.tag);
		}

		return target;
	}

	public async posthandle(msg: GuildMessage, target: GuildMember, reason: string, duration: number | undefined): Promise<Message> {
		const thisCase = await msg.guild.moderation.cases.createCase('kick', msg.author, target.user, reason, duration, null);

		return msg.channel.send(msg.guild.language.tget('COMMAND_KICK_SUCCESS', target.user.tag, thisCase));
	}

}
