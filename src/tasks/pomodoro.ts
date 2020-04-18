import { Task } from 'klasa';
import { UserSettings } from '@lib/types/settings/UserSettings';

export default class extends Task {

	async run({ user }: PomodoroTaskData): Promise<void> {
		const _user = this.client.users.cache.get(user);

		if (_user.pomodoro.currentSegment === 'work' && _user.pomodoro.workRoundNumber <= 3) {
			Promise.all([
				_user.send('Great job! Time for your short break!'),
				_user.settings.update(UserSettings.Pomodoro.CurrentSegment, 'short'),
				_user.pomodoro.createPomodoroTask(_user.pomodoro.shortBreakSegmentLength)
			]);
		} else if (_user.pomodoro.currentSegment === 'work' && _user.pomodoro.workRoundNumber === 4) {
			Promise.all([
				_user.send('Great job! Time for your long break, you\'ve earned it!'),
				_user.settings.update(UserSettings.Pomodoro.CurrentSegment, 'long'),
				_user.pomodoro.createPomodoroTask(_user.pomodoro.longBreakSegmentLength)
			]);
		} else if (_user.pomodoro.currentSegment === 'short' || _user.pomodoro.currentSegment === 'long') {
			Promise.all([
				_user.send('Time to get back to work! You got this.'),
				_user.settings.update(UserSettings.Pomodoro.CurrentSegment, 'work'),
				_user.pomodoro.incrementWorkRoundNumber(),
				_user.pomodoro.createPomodoroTask(_user.pomodoro.workSegmentLength)
			]);
		} else { this.client.console.log('i have no idea what is going on with this pomodoro thing'); }
	}

}

interface PomodoroTaskData {
	user: string;
}
