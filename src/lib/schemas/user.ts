import { Client } from 'klasa';
import { Time } from '@lib/types/enums';

export default Client.defaultUserSchema
	.add('embedColor', 'Color')
	.add('pomodoro', pom => pom
		.add('longBreakTime', 'Integer', { default: 15 * Time.Minute })
		.add('shortBreakTime', 'Integer', { default: 5 * Time.Minute })
		.add('workTime', 'Integer', { default: 25 * Time.Minute }));
