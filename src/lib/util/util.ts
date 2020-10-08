import { Guild, GuildAuditLogsAction, MessageEmbed, User } from 'discord.js';
import { Client, util, RichDisplay } from 'klasa';
import { chunk } from '@klasa/utils';
import prettyMilliseconds = require('pretty-ms');
import moment = require('moment');

export function floatPromise(ctx: { client: Client }, promise: Promise<unknown>): void {
	if (util.isThenable(promise)) promise.catch(error => ctx.client.emit('error', error));
}

/* TODO: internationalize date format (requires additonal languages to be added first) */
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

export function richDisplayList(items: string[], chunkSize: number, stringPrefix?: string): RichDisplay {
	const display = new RichDisplay(new MessageEmbed());

	for (const page of chunk(items, chunkSize)) {
		const description = page.map(item => `\`${stringPrefix ?? ''}${item}\``).join(', ');
		display.addPage((embed: MessageEmbed) => embed.setDescription(description));
	}

	return display;
}
