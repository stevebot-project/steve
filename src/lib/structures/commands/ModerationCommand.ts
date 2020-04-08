import { SteveCommand, SteveCommandOptions } from './SteveCommand';
import { CommandStore, util, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { GuildMember, User, TextChannel, Guild, UserResolvable, Snowflake, Message } from 'discord.js';

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
		if (target instanceof GuildMember) await this.checkModeratable(target, msg.member!);

		const type: string = await this.handle(msg, target, reason = reason || '');
		if (duration && type) await this.createModerationTask(msg.guild!, target, type, duration);

		return this.posthandle(msg.channel as TextChannel, target);
	}

	public abstract handle(msg: KlasaMessage, target: GuildMember | User, reason: string): Promise<string>;
	public abstract posthandle(channel: TextChannel, target: GuildMember | User): Promise<Message>;

	// eslint-disable-next-line @typescript-eslint/require-await
	private async checkModeratable(target: GuildMember, moderator: GuildMember): Promise<boolean> {
		if (target.id === target.guild.me!.id) throw 'hahahahaha... no.';
		if (target.id === moderator.id) throw 'Come on fam, don\'t do that to yourself.';
		if (target.roles.highest.comparePositionTo(moderator.roles.highest) > 0) throw `${target.user.tag} has a higher role than you.`;
		return true;
	}

	private async createModerationTask(guild: Guild, target: GuildMember | UserResolvable | TextChannel, taskType: string, time: number): Promise<void> {
		await this.client.schedule.create(taskType, Date.now() + time, {
			catchUp: true,
			data: {
				guild: guild.id,
				target: target instanceof GuildMember || target instanceof User
					? target.id
					: target instanceof Message
						? target.author.id
						: target
			}
		});
	}

}

export interface ModerationTaskData {
	guild: Snowflake;
	target: Snowflake;
}
