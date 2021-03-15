import { Time } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { Extendable, ExtendableOptions, Schedule, ScheduledTask } from 'klasa';

@ApplyOptions<ExtendableOptions>({
	appliesTo: [Schedule]
})
export default class extends Extendable {

	// eslint-disable-next-line max-len
	public createModerationTask(this: Schedule, taskName: ModerationTask, duration: number, taskData: ModerationTaskData): Promise<ScheduledTask> {
		return this.create(taskName, Date.now() + duration, {
			catchUp: true,
			data: { target: taskData.targetID, guild: taskData.guildID }
		});
	}

	public createReminder(this: Schedule, duration: number, userID: string, content: string, channelID: string): Promise<Reminder> {
		return this.create('reminder', Date.now() + duration, {
			catchUp: true,
			data: { userID, content, channelID }
		});
	}

	public createSnooze(this: Schedule, userID: string, content: string, channelID: string): Promise<Reminder> {
		return this.create('snooze', Date.now() + (5 * Time.MINUTE), {
			catchUp: true,
			data: { userID, content, channelID }
		});
	}

	public getUserReminders(this: Schedule, userID: string): Reminder[] {
		const filter = (task: ScheduledTask) => {
			const id = task.data.userID ?? task.data.user;
			return task.taskName === 'reminder' && id === userID;
		};
		return this.tasks.filter(filter);
	}

	public getUserSnooze(this: Schedule, userID: string): Reminder | undefined {
		return this.tasks.filter((task: ScheduledTask) => {
			const id = task.data.userID ?? task.data.user;
			return task.taskName === 'snooze' && id === userID;
		}).pop();
	}

}

export type ModerationTask = 'unmute' | 'undeafen' | 'unban';

export interface ModerationTaskData {
	targetID: string;
	guildID: string;
}

export interface ReminderData {
	userID: string;
	content: string;
	channelID: string;
}

export interface OldReminderData {
	user: string;
	content: string;
	channel: string;
}

export interface Reminder extends ScheduledTask {
	data: ReminderData | OldReminderData;
}

