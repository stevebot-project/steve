import { ModerationCommand } from '@lib/structures/commands/ModerationCommand';
import { CommandStore, KlasaMessage, ScheduledTask } from 'klasa';
import { User, GuildMember, Guild, TextChannel, Message } from 'discord.js';
import { friendlyDuration } from '@utils/util';

export default class extends ModerationCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_MUTE_DESCRIPTION'),
			duration: true,
			extendedHelp: lang => lang.get('COMMAND_MUTE_EXTENDED'),
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
			await msg.guild!.moderation.mute(target, reason);
		} catch (err) {
			this.client.console.error(err);
			throw msg.language.get('COMMAND_MUTE_UNABLE', target.user.tag);
		}

		return target;
	}

	public async posthandle(channel: TextChannel, target: GuildMember, moderator: User, reason: string, duration: number): Promise<Message> {
		// eslint-disable-next-line @typescript-eslint/init-declarations
		let task: ScheduledTask;
		let prettyDuration = target.guild.language.get('MODERATION_NODURATION');

		if (duration) {
			task = await this.client.schedule.create('unmute', Date.now() + duration, {
				catchUp: true,
				data: {
					target,
					guild: target.guild
				}
			});

			prettyDuration = friendlyDuration(duration);
		}

		const thisCase = await target.guild.moderation.cases.createCase('mute', moderator, target.user, reason, prettyDuration, duration ? task! : null);

		return channel.send(channel.guild.language.get('COMMAND_MUTE_SUCCESS', target.user.tag, thisCase.number));
	}

}
