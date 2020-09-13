import { Guild, GuildAuditLogsAction, User } from 'discord.js';
import { Client, util } from 'klasa';
import prettyMilliseconds = require('pretty-ms');
import moment = require('moment');

export function floatPromise(ctx: { client: Client }, promise: Promise<unknown>): void {
	if (util.isThenable(promise)) promise.catch(error => ctx.client.emit('error', error));
}

export function formatDate(date: number | Date, format = 'YYYY MMM Do'): string {
	return moment(date).format(format);
}

export function friendlyDuration(duration: number): string {
	return prettyMilliseconds(duration, { compact: true, verbose: true });
}

export async function getExecutor(guild: Guild, type: GuildAuditLogsAction | number): Promise<User> {
	const logs = await guild.fetchAuditLogs({ limit: 1, type });
	return logs.entries.first()!.executor;
}

export function toTitleCase(str: string): string {
	const words = str.split(' ');

	for (let i = 0; i < words.length; i++) {
		words.splice(i, 1, `${words[i][0].toUpperCase()}${words[i].slice(1)}`);
	}

	return words.join(' ');
}
