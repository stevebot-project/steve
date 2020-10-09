import { Extendable, ExtendableStore, Schedule, ScheduledTask } from 'klasa';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Schedule] });
	}

	public createModerationTask(this: Schedule, taskName: 'unmute' | 'undeafen' | 'unban', duration: number, taskData: ModerationTaskData): Promise<ScheduledTask> {
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

	public getUserReminders(this: Schedule, userID: string): Reminder[] {
		const filter = (task: ScheduledTask) => {
			const id = task.data.userID ?? task.data.user;
			return task.taskName === 'reminder' && id === userID;
		};
		return this.tasks.filter(filter);
	}

}

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

