import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { CommandStore, KlasaMessage, Piece } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['u'],
			description: lang => lang.tget('COMMAND_UNLOAD_DESCRIPTION'),
			guarded: true,
			permissionLevel: PermissionsLevels.OWNER,
			usage: '<Piece:piece>'
		});
	}

	public async run(msg: KlasaMessage, [piece]: [Piece]) {
		if ((piece.type === 'event' && piece.name === 'message') || (piece.type === 'monitor' && piece.name === 'commandHandler')) {
			return msg.sendLocale('COMMAND_UNLOAD_WARN');
		}
		piece.unload();
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.store}.get('${piece.name}').unload();
			`);
		}
		return msg.sendLocale('COMMAND_UNLOAD', [piece.type, piece.name]);
	}

}
