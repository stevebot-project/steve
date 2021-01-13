import { ModerationCommand, ModerationCommandOptions } from '@lib/structures/commands/ModerationCommand';
import { User, Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<ModerationCommandOptions>({
	description: lang => lang.tget('commandUnbanDescription'),
	extendedHelp: lang => lang.tget('commandUnbanExtended'),
	requiredPermissions: ['BAN_MEMBERS'],
	usage: '<user:user> [reason:string]'
})
export default class extends ModerationCommand {

	public async prehandle(target: User): Promise<User> {
		return target;
	}

	public async handle(msg: GuildMessage, target: User, reason: string): Promise<User> {
		try {
			await msg.guild.moderation.unban(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.guild.language.tget('commandUnbanUnable', target.tag);
		}

		return target;
	}

	public async posthandle(msg: GuildMessage, target: User, reason: string, duration: number | undefined): Promise<Message> {
		const thisCase = await msg.guild.moderation.cases.createCase('unban', msg.author, target, reason, duration, null);

		return msg.channel.send(msg.guild.language.tget('commandUnbanSuccess', target.tag, thisCase));
	}

}
