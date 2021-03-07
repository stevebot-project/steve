
import { Task } from 'klasa';
import { OldReminderData, ReminderData } from '../extendables/Schedule';

export default class extends Task {

	public run(data: ReminderData | OldReminderData): ReminderData | OldReminderData {
		return data;
	}

}
