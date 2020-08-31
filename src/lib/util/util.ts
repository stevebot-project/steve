import { Guild, GuildAuditLogsAction, User, MessageEmbed } from 'discord.js';
import { Client, util } from 'klasa';
import prettyMilliseconds from 'pretty-ms';
import moment from 'moment';

export function floatPromise(ctx: { client: Client }, promise: Promise<unknown>): void {
	if (util.isThenable(promise)) promise.catch(error => ctx.client.emit('error', error));
}

export function formatDate(date: number | Date, format = 'YYYY MMM Do'): string {
	return moment(date).format(format);
}

export function friendlyColonDuration(duration: number): string {
	return prettyMilliseconds(duration, { colonNotation: true, secondsDecimalDigits: 0 });
}

export function friendlyDuration(duration: number): string {
	return prettyMilliseconds(duration, { compact: true, verbose: true });
}

export async function getExecutor(guild: Guild, type: GuildAuditLogsAction | number): Promise<User> {
	const logs = await guild.fetchAuditLogs({ limit: 1, type: type });
	return logs.entries.first().executor;
}

export function newEmbed(): MessageEmbed {
	return new MessageEmbed;
}
