import { SteveCommand, SteveCommandOptions } from './SteveCommand';
import { CommandStore, util, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { GuildMember, User, TextChannel, Snowflake, Message } from 'discord.js';

export interface ModerationCommandOptions extends SteveCommandOptions {
	duration?: boolean;
	targetType: 'member' | 'user';
}

export abstract class ModerationCommand extends SteveCommand {

	public duration?: boolean;
	public targetType: string;

	protected constructor(store: CommandStore, file: string[], directory: string, options: ModerationCommandOptions) {
		super(store, file, directory, util.mergeDefault({
			permissionLevel: PermissionLevels.MODERATOR,
			runIn: ['text'],
			usage: options.targetType === 'member'
				? options.duration
					? '<targetMember:membername> [reason:string] [duration:timespan]'
					: '<targetMember:membername> [reason:string]'
				: options.duration
					? '<targetUser:user> [reason:string] [duration:timespan]'
					: '<targetUser:user> [reason:string]'
		}, options));

		this.duration = options.duration;
		this.targetType = options.targetType;
	}

	public async run(msg: KlasaMessage, [target, reason, duration]: [GuildMember | User, string, number]): Promise<Message> {
		if (target instanceof GuildMember) await this.checkModeratable(target, msg.member, msg);

		const type: string = await this.handle(msg, target, reason = reason || '');
		if (duration && type) await this.client.schedule.createModerationTask(msg.guild, target, type, duration);

		return this.posthandle(msg.channel as TextChannel, target);
	}

	public abstract handle(msg: KlasaMessage, target: GuildMember | User, reason: string): Promise<string>;
	public abstract posthandle(channel: TextChannel, target: GuildMember | User): Promise<Message>

	private async checkModeratable(target: GuildMember, moderator: GuildMember, msg: KlasaMessage): Promise<boolean> {
		if (target.id === target.guild.me.id) throw msg.language.get('COMMAND_MODERATION_TARGET_STEVE');
		if (target.id === moderator.id) throw msg.language.get('COMMAND_MODERATION_TARGET_SELF');
		if (target.roles.highest.comparePositionTo(moderator.roles.highest) > 0) throw msg.language.get('COMMAND_MODERATION_TARGET_HIGHER_ROLE', target.user.tag);
		return true;
	}

}

export interface ModerationTaskData {
	guild: Snowflake;
	target: Snowflake;
}
