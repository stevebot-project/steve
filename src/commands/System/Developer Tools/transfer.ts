import { CommandOptions, KlasaMessage, Piece } from 'klasa';
import * as fs from 'fs-nextra';
import { resolve, join } from 'path';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandTransferDescription'),
	guarded: true,
	permissionLevel: PermissionsLevels.OWNER,
	usage: '<Piece:piece>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [piece]: [Piece]) {
		const file = join(...piece.file);
		const fileLocation = resolve(piece.directory, file);

		await fs.access(fileLocation).catch(() => {
			throw msg.language.tget('commandTransferError');
		});

		try {
			await fs.copy(fileLocation, join(piece.store.userDirectory, file));
			piece.store.load(piece.store.userDirectory, piece.file);
			if (this.client.shard) {
				await this.client.shard.broadcastEval(`
					if (String(this.options.shards) !== '${this.client.options.shards}') this.${piece.store}.load(${piece.store.userDirectory}, ${JSON.stringify(piece.file)});
				`);
			}
			return msg.sendLocale('commandTransferSuccess', [piece.type, piece.name]);
		} catch (err) {
			this.client.emit('error', err.stack);
			return msg.sendLocale('commandTransferFailed', [piece.type, piece.name]);
		}
	}

}
