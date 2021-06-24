import { Guild, GuildAuditLogsAction, Message, MessageEmbed, User } from 'discord.js';
import { Client, util, RichDisplay } from 'klasa';
import { chunk } from '@klasa/utils';
import { Emojis } from '@lib/types/Enums';
import * as prettyMilliseconds from 'pretty-ms';
import * as moment from 'moment';

/**
 *
 * @param ctx The context of the function call
 * @param promise The Promise to be executed
 */
export function floatPromise(ctx: { client: Client }, promise: Promise<unknown>): void {
	if (util.isThenable(promise)) promise.catch(error => ctx.client.emit('error', error));
}

/* TODO: internationalize date format (requires additonal languages to be added first) */
/**
 *
 * @param date A unix timestamp or Date object
 * @param format A string to be used for moment.js formatting
 * @returns The formatted date
 */
export function formatDate(date: number | Date, format = 'YYYY MMM Do'): string {
	return moment(date).format(format);
}

/**
 *
 * @param duration The number of milliseconds to be displayed
 * @returns A human-readable duration
 */
export function friendlyDuration(duration: number): string {
	return prettyMilliseconds(duration, { compact: true, verbose: true });
}

/**
 *
 * @param guild The guild whose audit logs should be accessed
 * @param type The GuildAuditLogsAction (or corresponding number) to search the audit logs for
 * @returns A Promise that resolves to the executor's User object
 */
export async function getExecutor(guild: Guild, type: GuildAuditLogsAction | number): Promise<User> {
	const logs = await guild.fetchAuditLogs({ limit: 1, type });
	return logs.entries.first()!.executor;
}

/**
 *
 * @param array An array of any type
 * @returns A random element of the array
 */
export function pickRandom<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

/**
 *
 * @param items The list of items to be displayed in the RichDisplay
 * @param chunkSize The number of items to be included on each page
 * @param stringPrefix An optional string to affix each item with
 * @returns A RichDisplay object
 */
export function richDisplayList(items: string[], chunkSize: number, stringPrefix?: string): RichDisplay {
	const display = new RichDisplay(new MessageEmbed());

	for (const page of chunk(items, chunkSize)) {
		const description = page.map(item => `${stringPrefix ?? ''}${item}`).join(' | ');
		display.addPage((embed: MessageEmbed) => embed.setDescription(description));
	}

	return display;
}

export function sendLoadingMessage(msg: Message) {
	return msg.channel.send(new MessageEmbed().setColor(0x71adcf).setDescription(`${Emojis.LOADING} ${msg.language.randomLoadingMessage}`));
}
