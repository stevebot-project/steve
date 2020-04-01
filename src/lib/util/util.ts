import { Guild, GuildAuditLogsAction, User, MessageEmbed } from 'discord.js';
import { KlasaConsole } from 'klasa';
import prettyMilliseconds from 'pretty-ms';

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

export function noLog(kconsole: KlasaConsole, log: string, guildName: string): void {
	return kconsole.log(`The ${guildName} server has not set a ${log}log.`);
}
