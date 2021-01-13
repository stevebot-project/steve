
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { CommandOptions, KlasaMessage, util, SettingsUpdateResult } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandConfUserDescription'),
	extendedHelp: lang => lang.tget('commandConfUserExtended'),
	guarded: true,
	subcommands: true,
	usage: '<set|show|remove|reset> (key:key) (value:value) [...]'
})
export default class extends SteveCommand {

	public async init() {
		this
			.createCustomResolver('key', (arg, possible, message, [action]) => {
				if (action === 'show' || arg) return arg;
				throw message.language.get('commandConfNokey');
			})
			.createCustomResolver('value', (arg, possible, message, [action]) => {
				if (!['set', 'remove'].includes(action) || arg) return arg;
				throw message.language.get('commandConfNovalue');
			});
	}

	public show(msg: KlasaMessage, [key]: [string]) {
		// @ts-expect-error 2322
		const path = this.client.gateways.users.getPath(key, { avoidUnconfigurable: true, errors: false, piece: null });
		if (!path) return msg.sendLocale('commandConfGetNoext', [key]);
		if (path.piece.type === 'Folder') {
			return msg.sendLocale('commandConfUser', [
				key
				// eslint-disable-next-line @typescript-eslint/unbound-method
					? `: ${key.split('.').map(util.toTitleCase).join('/')}`
					// @ts-expect-error 2345
					: '', util.codeBlock('asciidoc', msg.author.settings.list(msg, path.piece))
			]);
		}
		return msg.sendLocale('commandConfGet', [path.piece.path, msg.author.settings.resolveString(msg, path.piece)]);
	}

	public async set(msg: KlasaMessage, [key, ...valueToSet]: [string, string[]]) {
		const status = await msg.author.settings.update(key, valueToSet.join(' '), msg.guild!, { avoidUnconfigurable: true, action: 'add' });
		return this.check(msg, key, status) || msg.sendLocale('commandConfUpdated', [key, msg.author.settings.resolveString(msg, status.updated[0].piece)]);
	}

	public async remove(msg: KlasaMessage, [key, ...valueToRemove]: [string, string[]]) {
		const status = await msg.author.settings.update(key, valueToRemove.join(' '), msg.guild!, { avoidUnconfigurable: true, action: 'remove' });
		return this.check(msg, key, status) || msg.sendLocale('commandConfUpdated', [key, msg.author.settings.resolveString(msg, status.updated[0].piece)]);
	}

	public async reset(msg: KlasaMessage, [key]: [string]) {
		const status = await msg.author.settings.reset(key, { avoidUnconfigurable: true });
		return this.check(msg, key, status) || msg.sendLocale('commandConfReset', [key, msg.author.settings.resolveString(msg, status.updated[0].piece)]);
	}

	private check(msg: KlasaMessage, key: string, { errors, updated }: SettingsUpdateResult) {
		if (errors.length) return msg.sendMessage(errors[0]);
		if (!updated.length) return msg.sendLocale('commandConfNochange', [key]);
		return null;
	}

}
