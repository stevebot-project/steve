import { Extendable, ExtendableStore, Schedule, ScheduledTask } from 'klasa';
import { Snowflake } from 'discord.js';

export default class extends Extendable {

	public constructor(store: ExtendableStore, file: string[], directory: string) {
		super(store, file, directory, { appliesTo: [Schedule] });
	}

	public getUserReminders(this: Schedule, snowflake: Snowflake): ScheduledTask[] {
		return this.tasks.filter(task => task.taskName === 'reminder' && task.data.user === snowflake);
	}

}
