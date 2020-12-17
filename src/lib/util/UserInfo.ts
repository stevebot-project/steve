import { Time } from '@lib/types/Enums';
import { Guild } from 'discord.js';
import { formatDate, friendlyDuration } from './util';

export function getJoinDateString(guild: Guild, timestamp: number): string {
	const timeSinceJoin = Date.now() - timestamp;
	const joinDate = formatDate(timestamp);

	if (timeSinceJoin > Time.DAY && timeSinceJoin < Time.HOUR * 31) {
		return guild.language.tget('COMMAND_WHOIS_JOINEDGUILD_HOURS', Math.floor(timeSinceJoin / Time.HOUR), joinDate);
	}

	return guild.language.tget('COMMAND_WHOIS_DATE', friendlyDuration(timeSinceJoin), joinDate);
}

export function userAccountCreated(guild: Guild, timestamp: number) {
	return guild.language.tget('COMMAND_WHOIS_DATE', friendlyDuration(Date.now() - timestamp), formatDate(timestamp));
}
