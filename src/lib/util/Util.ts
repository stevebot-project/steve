import { MessageEmbed } from 'discord.js';
import { Client, util } from 'klasa';
import prettyMilliseconds from 'pretty-ms';

export function buildEmbed(): MessageEmbed {
	return new MessageEmbed; // eslint-disable-line new-parens
}

export function floatPromise(ctx: { client: Client }, promise: Promise<unknown>): void {
	if (util.isThenable(promise)) promise.catch(error => ctx.client.emit('error', error));
}

export function friendlyDuration(duration: number): string {
	return prettyMilliseconds(duration, { compact: true, verbose: true });
}
