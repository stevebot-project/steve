import { Time } from '@lib/types/Enums';
import { Client } from 'klasa';

export default Client.defaultUserSchema
	.add('embedColor', 'Color')
	.add('snoozeDuration', 'Integer', { 'default': 30 * Time.MINUTE });
