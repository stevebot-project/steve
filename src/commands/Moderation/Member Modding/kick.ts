import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { User, Guild, GuildMember, Message } from 'discord.js';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_KICK_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_KICK_EXTENDED')
		});
	}

	public async prehandle(target: User, guild: Guild): Promise<GuildMember> {
		const member = await guild.members.fetch(target);
		if (!member) throw guild.language.tget('USER_NOT_IN_GUILD', target.tag);
		return member;
	}

	public async handle(msg: KlasaMessage, target: GuildMember, reason: string): Promise<GuildMember> {
		try {
			await msg.guild!.moderation.kick(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.guild!.language.tget('COMMAND_KICK_UNABLE', target.user.tag);
		}

		return target;
	}

	public async posthandle(msg: KlasaMessage, target: GuildMember, reason: string, duration: number | undefined): Promise<Message> {
		const thisCase = await msg.guild!.moderation.cases.createCase('kick', msg.author, target.user, reason, duration, null);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_KICK_SUCCESS', target.user.tag, thisCase));
	}

}
