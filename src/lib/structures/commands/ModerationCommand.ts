import { SteveCommand } from './SteveCommand';
import { CommandOptions, CommandStore, util } from 'klasa';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMember, User, Message, Guild } from 'discord.js';
import { GuildMessage } from '@lib/types/Messages';

export interface ModerationCommandOptions extends CommandOptions {
	duration?: boolean;
}

export abstract class ModerationCommand extends SteveCommand {

	public duration?: boolean;

	protected constructor(store: CommandStore, file: string[], directory: string, options: ModerationCommandOptions) {
		super(store, file, directory, util.mergeDefault({
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text'],
			usage: options.duration
				? '<user:username> [reason:string] [duration:timespan]'
				: '<user:username> [reason:string]'
		}, options));

		this.duration = options.duration;
	}

	public async run(msg: GuildMessage, [target, reason, duration]: [User, string | undefined, number | undefined]): Promise<Message> {
		const prehandledTarget = await this.prehandle(target, msg.guild);
		if (prehandledTarget instanceof GuildMember) this.checkModeratable(prehandledTarget, msg.member);

		if (typeof reason === 'undefined') reason = msg.guild.language.tget('moderationNoReason') as string;

		await this.handle(msg, prehandledTarget, reason);

		return this.posthandle(msg, prehandledTarget, reason, duration);
	}

	public abstract prehandle(target: User, guild: Guild): Promise<GuildMember | User>; // choose target type
	public abstract handle(msg: GuildMessage, target: GuildMember | User, reason: string): Promise<GuildMember | User>; // do the thing
	// eslint-disable-next-line max-len
	public abstract posthandle(msg: GuildMessage, target: GuildMember | User, reason: string, duration: number | undefined): Promise<Message>; // handle modlog and case

	private checkModeratable(target: GuildMember, moderator: GuildMember): boolean {
		if (target.id === target.guild.me!.id) throw target.guild.language.tget('moderationNoSteve');
		if (target.id === moderator.id) throw target.guild.language.tget('moderationNoSelf');
		if (target.roles.highest.comparePositionTo(moderator.roles.highest) > 0) throw target.guild.language.tget('moderationHigherRole', target.user.tag);
		return true;
	}

}
