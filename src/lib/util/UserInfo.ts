import { Time } from '@lib/types/Enums';
import { Guild } from 'discord.js';
import { formatDate, friendlyDuration } from './util';

export function getJoinDateString(guild: Guild, timestamp: number): string {
	const timeSinceJoin = Date.now() - timestamp;
	const joinDate = formatDate(timestamp);

	if (timeSinceJoin > Time.DAY && timeSinceJoin < Time.HOUR * 31) {
		return guild.language.tget('commandWhoisJoinedguildHours', Math.floor(timeSinceJoin / Time.HOUR), joinDate);
	}

	return guild.language.tget('commandWhoisDate', friendlyDuration(timeSinceJoin), joinDate);
}

export function userAccountCreated(guild: Guild, timestamp: number) {
	return guild.language.tget('commandWhoisDate', friendlyDuration(Date.now() - timestamp), formatDate(timestamp));
}
