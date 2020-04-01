import { Extendable, ExtendableStore, Schedule, ScheduledTask } from 'klasa';
import { Snowflake } from 'discord.js';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Schedule] });
	}

	public async getUserReminders(this: Schedule, snowflake: Snowflake): Promise<ScheduledTask[]> {
		return this.tasks.filter(task => task.taskName === 'reminder' && task.data.user === snowflake);
	}

}
