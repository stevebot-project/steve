import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { User, Message } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_UNBAN_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_UNBAN_EXTENDED'),
			usage: '<user:user> [reason:string]'
		});
	}

	public async prehandle(target: User): Promise<User> {
		return target;
	}

	public async handle(msg: KlasaMessage, target: User, reason: string): Promise<User> {
		try {
			await msg.guild!.moderation.unban(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.language.get('COMMAND_UNBAN_UNABLE', target.tag);
		}

		return target;
	}

	public async posthandle(msg: KlasaMessage, target: User, reason: string, duration: number | undefined): Promise<Message> {
		const thisCase = await msg.guild!.moderation.cases.createCase('unban', msg.author, target, reason, duration, null);

		return msg.channel.send(msg.language.get('COMMAND_UNBAN_SUCCESS', target.tag, thisCase));
	}

}
