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

	public createReminder(this: Schedule, duration: number, userID: string, content: string, channelID: string): Promise<ScheduledTask> {
		return this.create('reminder', Date.now() + duration, {
			catchUp: true,
			data: { userID, content, channelID }
		});
	}

	public getUserReminders(this: Schedule, userID: string): ScheduledTask[] {
		return this.tasks.filter(task => task.taskName === 'reminder' && task.data.userID === userID);
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
