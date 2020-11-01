import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { CommandStore, KlasaMessage, Piece } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: language => language.get('COMMAND_ENABLE_DESCRIPTION'),
			guarded: true,
			permissionLevel: PermissionsLevels.OWNER,
			usage: '<Piece:piece>'
		});
	}

	public async run(msg: KlasaMessage, [piece]: [Piece]) {
		piece.enable();
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.store}.get('${piece.name}').enable();
			`);
		}
		return msg.sendLocale('COMMAND_ENABLE', [piece.type, piece.name], { code: 'diff' });
	}

}
