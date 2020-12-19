import { ModerationCommand, ModerationCommandOptions } from '@lib/structures/commands/ModerationCommand';
import { KlasaMessage } from 'klasa';
import { User, Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<ModerationCommandOptions>({
	description: lang => lang.tget('COMMAND_UNBAN_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_UNBAN_EXTENDED'),
	usage: '<user:user> [reason:string]'
})
export default class extends ModerationCommand {

	public async prehandle(target: User): Promise<User> {
		return target;
	}

	public async handle(msg: KlasaMessage, target: User, reason: string): Promise<User> {
		try {
			await msg.guild!.moderation.unban(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.guild!.language.tget('COMMAND_UNBAN_UNABLE', target.tag);
		}

		return target;
	}

	public async posthandle(msg: KlasaMessage, target: User, reason: string, duration: number | undefined): Promise<Message> {
		const thisCase = await msg.guild!.moderation.cases.createCase('unban', msg.author, target, reason, duration, null);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_UNBAN_SUCCESS', target.tag, thisCase));
	}

}
