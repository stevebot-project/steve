import { Client } from 'klasa';
import { Time } from '@lib/types/enums';

export default Client.defaultUserSchema
	.add('embedColor', 'Color')
	.add('pomodoro', pom => pom
		.add('currentSegment', 'PomodoroSegment', { configurable: false })
		.add('longBreakTime', 'Integer', { default: 15 * Time.Minute })
		.add('running', 'Boolean', { configurable: false, default: false })
		.add('shortBreakTime', 'Integer', { default: 5 * Time.Minute })
		.add('workRoundNumber', 'Integer', { configurable: false, default: 0 })
		.add('workTime', 'Integer', { default: 25 * Time.Minute }));
