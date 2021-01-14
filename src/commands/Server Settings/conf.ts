
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { CommandOptions, util, SettingsUpdateResult } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandConfServerDescription'),
	extendedHelp: lang => lang.tget('commandConfServerExtended'),
	guarded: true,
	permissionLevel: PermissionsLevels.ADMINISTRATOR,
	runIn: ['text'],
	subcommands: true,
	usage: '<set|show|remove|reset> (key:key) (value:value) [...]'
})
@CreateResolvers([
	[
		'key',
		(str, possible, msg, [action]) => {
			if (action === 'show' || str) return str;
			throw msg.language.tget('commandConfNoKey');
		}
	],
	[
		'value',
		(str, possible, msg, [action]) => {
			if (!['set', 'remove'].includes(action) || str) return str;
			throw msg.language.tget('commandConfNoValue');
		}
	]
])
export default class extends SteveCommand {

	public show(msg: GuildMessage, [key]: [string]) {
		// @ts-expect-error 2322
		const path = this.client.gateways.guilds.getPath(key, { avoidUnconfigurable: true, errors: false, piece: null });
		if (!path) return msg.sendLocale('commandConfGetNoExt', [key]);
		if (path.piece.type === 'Folder') {
			return msg.sendLocale('commandConfServer', [
				key
					// eslint-disable-next-line @typescript-eslint/unbound-method
					? `: ${key.split('.').map(util.toTitleCase).join('/')}`
					// @ts-expect-error 2345
					: '', util.codeBlock('asciidoc', msg.guild.settings.list(msg, path.piece))
			]);
		}
		return msg.sendLocale('commandConfGet', [path.piece.path, msg.guild.settings.resolveString(msg, path.piece)]);
	}

	public async set(msg: GuildMessage, [key, ...valueToSet]: [string, string[]]) {
		const status = await msg.guild.settings.update(key, valueToSet.join(' '), msg.guild, { avoidUnconfigurable: true, action: 'add' });
		return this.check(msg, key, status) || msg.sendLocale('commandConfUpdated', [key, msg.guild.settings.resolveString(msg, status.updated[0].piece)]);
	}

	public async remove(msg: GuildMessage, [key, ...valueToRemove]: [string, string[]]) {
		const status = await msg.guild.settings.update(key, valueToRemove.join(' '), msg.guild, { avoidUnconfigurable: true, action: 'remove' });
		return this.check(msg, key, status) || msg.sendLocale('commandConfUpdated', [key, msg.guild.settings.resolveString(msg, status.updated[0].piece)]);
	}

	public async reset(msg: GuildMessage, [key]: [string]) {
		const status = await msg.guild.settings.reset(key, msg.guild, { avoidUnconfigurable: true });
		return this.check(msg, key, status) || msg.sendLocale('commandConfReset', [key, msg.guild.settings.resolveString(msg, status.updated[0].piece)]);
	}

	private check(msg: GuildMessage, key: string, { errors, updated }: SettingsUpdateResult) {
		if (errors.length) return msg.sendMessage(String(errors[0]));
		if (!updated.length) return msg.sendLocale('commandConfNoChange', [key]);
		return null;
	}

}
