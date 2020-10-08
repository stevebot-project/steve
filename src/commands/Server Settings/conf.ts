/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { CommandStore, KlasaMessage, util, SettingsUpdateResult } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_CONF_SERVER_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_CONF_SERVER_EXTENDED'),
			guarded: true,
			permissionLevel: PermissionsLevels.ADMINISTRATOR,
			runIn: ['text'],
			subcommands: true,
			usage: '<set|show|remove|reset> (key:key) (value:value) [...]'
		});

		this
			.createCustomResolver('key', (arg, possible, message, [action]) => {
				if (action === 'show' || arg) return arg;
				throw message.language.get('COMMAND_CONF_NOKEY');
			})
			.createCustomResolver('value', (arg, possible, message, [action]) => {
				if (!['set', 'remove'].includes(action) || arg) return arg;
				throw message.language.get('COMMAND_CONF_NOVALUE');
			});
	}

	public show(msg: KlasaMessage, [key]: [string]) {
		// @ts-expect-error 2322
		const path = this.client.gateways.guilds.getPath(key, { avoidUnconfigurable: true, errors: false, piece: null });
		if (!path) return msg.sendLocale('COMMAND_CONF_GET_NOEXT', [key]);
		if (path.piece.type === 'Folder') {
			return msg.sendLocale('COMMAND_CONF_SERVER', [
				key
					// eslint-disable-next-line @typescript-eslint/unbound-method
					? `: ${key.split('.').map(util.toTitleCase).join('/')}`
					// @ts-expect-error 2345
					: '', util.codeBlock('asciidoc', msg.guild!.settings.list(msg, path.piece))
			]);
		}
		return msg.sendLocale('COMMAND_CONF_GET', [path.piece.path, msg.guild!.settings.resolveString(msg, path.piece)]);
	}

	public async set(msg: KlasaMessage, [key, ...valueToSet]: [string, string[]]) {
		const status = await msg.guild!.settings.update(key, valueToSet.join(' '), msg.guild!, { avoidUnconfigurable: true, action: 'add' });
		return this.check(msg, key, status) || msg.sendLocale('COMMAND_CONF_UPDATED', [key, msg.guild!.settings.resolveString(msg, status.updated[0].piece)]);
	}

	public async remove(msg: KlasaMessage, [key, ...valueToRemove]: [string, string[]]) {
		const status = await msg.guild!.settings.update(key, valueToRemove.join(' '), msg.guild!, { avoidUnconfigurable: true, action: 'remove' });
		return this.check(msg, key, status) || msg.sendLocale('COMMAND_CONF_UPDATED', [key, msg.guild!.settings.resolveString(msg, status.updated[0].piece)]);
	}

	public async reset(msg: KlasaMessage, [key]: [string]) {
		const status = await msg.guild!.settings.reset(key, msg.guild!, { avoidUnconfigurable: true });
		return this.check(msg, key, status) || msg.sendLocale('COMMAND_CONF_RESET', [key, msg.guild!.settings.resolveString(msg, status.updated[0].piece)]);
	}

	private check(msg: KlasaMessage, key: string, { errors, updated }: SettingsUpdateResult) {
		if (errors.length) return msg.sendMessage(String(errors[0]));
		if (!updated.length) return msg.sendLocale('COMMAND_CONF_NOCHANGE', [key]);
		return null;
	}

}
