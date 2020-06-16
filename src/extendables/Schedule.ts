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

}

export interface ModerationTaskData {
	targetID: string;
	guildID: string;
}
