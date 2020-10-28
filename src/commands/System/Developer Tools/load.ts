import { CommandStore, KlasaMessage, Stopwatch, Store, Piece } from 'klasa';
import { pathExists } from 'fs-nextra';
import { join } from 'path';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { Constructor } from 'discord.js';

export default class extends SteveCommand {

	public regExp: RegExp;

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['l'],
			description: lang => lang.tget('COMMAND_LOAD_DESCRIPTION'),
			guarded: true,
			permissionLevel: PermissionsLevels.OWNER,
			usage: '[core] <Store:store> <path:...string>'
		});

		this.regExp = /\\\\?|\//g;
	}

	public async run<K, V extends Piece>(msg: KlasaMessage, [core, store, path]: [string, Store<K, V, Constructor<V>>, string]) {
		const pathSplit = (path.endsWith('.js') ? path : `${path}.js`).split(this.regExp);
		const timer = new Stopwatch();
		const piece = await (core ? this.tryEach(store, pathSplit) : store.load(store.userDirectory, pathSplit));

		try {
			if (!piece) throw msg.language.get('COMMAND_LOAD_FAIL');
			await piece.init();
			if (this.client.shard) {
				await this.client.shard.broadcastEval(`
					if (String(this.options.shards) !== '${this.client.options.shards}') {
						const piece = this.${piece.store}.load('${piece.directory}', ${JSON.stringify(pathSplit)});
						if (piece) piece.init();
					}
				`);
			}
			return msg.sendLocale('COMMAND_LOAD', [timer.stop(), store.name, piece.name]);
		} catch (error) {
			timer.stop();
			throw msg.language.get('COMMAND_LOAD_ERROR', store.name, piece ? piece.name : pathSplit.join('/'), error);
		}
	}

	private async tryEach<K, V extends Piece>(store: Store<K, V, Constructor<V>>, path: string[]) {
		// @ts-ignore 2341
		for (const dir of store.coreDirectories) if (await pathExists(join(dir, ...path))) return store.load(dir, path);
		return undefined;
	}

}
