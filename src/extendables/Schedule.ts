import { Extendable, ExtendableStore, Schedule, ScheduledTask } from 'klasa';
import { Snowflake, Guild, GuildMember, UserResolvable, TextChannel, User, Message } from 'discord.js';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Schedule] });
	}

	public createModerationTask(this: Schedule, guild: Guild, target: GuildMember | UserResolvable | TextChannel, taskType: string, time: number): Promise<ScheduledTask> {
		return this.create(taskType, Date.now() + time, {
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

	public createReminderTask(this: Schedule, user: string, content: string, duration: number, channel: string): Promise<ScheduledTask> {
		return this.create('reminder', Date.now() + duration, {
			data: { user, content, channel },
			catchUp: true
		});
	}

	public createRoleTask(this: Schedule, duration: number, user: string, guild: string, role: string): Promise<ScheduledTask> {
		return this.create('role', Date.now() + duration, {
			catchUp: true,
			data: { user, guild, role }
		});
	}

	public createSlowmodeTask(this: Schedule, duration: number, guild: string, channel: string): Promise<ScheduledTask> {
		return this.create('slow', Date.now() + duration, {
			catchUp: true,
			data: { guild, channel }
		});
	}

	public createUnlockTask(this: Schedule, duration: number, channel: string, guild: string): Promise<ScheduledTask> {
		return this.create('unlock', Date.now() + duration, {
			catchUp: true,
			data: { channel, guild }
		});
	}

	public async getUserReminders(this: Schedule, snowflake: Snowflake): Promise<ScheduledTask[]> {
		return this.tasks.filter(task => task.taskName === 'reminder' && task.data.user === snowflake);
	}

}
