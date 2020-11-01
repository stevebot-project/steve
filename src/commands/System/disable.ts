import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { CommandStore, KlasaMessage, Piece } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_DISABLE_DESCRIPTION'),
			guarded: true,
			permissionLevel: PermissionsLevels.OWNER,
			usage: '<Piece:piece>'
		});
	}

	public async run(msg: KlasaMessage, [piece]: [Piece]) {
		if ((piece.type === 'event' && piece.name === 'coreMessage') || (piece.type === 'monitor' && piece.name === 'commandHandler')) {
			return msg.sendLocale('COMMAND_DISABLE_WARN');
		}
		piece.disable();
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.store}.get('${piece.name}').disable();
			`);
		}
		return msg.sendLocale('COMMAND_DISABLE', [piece.type, piece.name], { code: 'diff' });
	}

}
