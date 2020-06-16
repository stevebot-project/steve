import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { User, GuildMember, Guild, Message } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_UNMUTE_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_UNMUTE_EXTENDED'),
			requiredSettings: ['roles.muted']
		});
	}

	public async prehandle(target: User, guild: Guild): Promise<GuildMember> {
		const member = await guild.members.fetch(target);
		if (!member) throw guild.language.get('USER_NOT_IN_GUILD', target.tag);
		return member;
	}

	public async handle(msg: KlasaMessage, target: GuildMember, reason: string): Promise<GuildMember> {
		try {
			await msg.guild!.moderation.unmute(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.language.get('COMMAND_UNMUTE_UNABLE', target.user.tag);
		}

		return target;
	}

	public async posthandle(msg: KlasaMessage, target: GuildMember, reason: string, duration: number | undefined): Promise<Message> {
		const thisCase = await msg.guild!.moderation.cases.createCase('mute', msg.author, target.user, reason, duration, null);

		return msg.channel.send(msg.language.get('COMMAND_UNMUTE_SUCCESS', target.user.tag, thisCase));
	}

}
