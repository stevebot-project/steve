import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Bulk deletes messages from a channel.',
			examples: ['purge 20'],
			permissionLevel: PermissionLevels.MODERATOR,
			requiredPermissions: ['MANAGE_MESSAGES'],
			runIn: ['text'],
			usage: '<num:integer{,99}>',
			helpUsage: '[1-99]'
		});
	}

	public async run(msg: KlasaMessage, [num]: [number]): Promise<void> {
		const purgeCollect = await msg.channel.bulkDelete(num + 1, true);

		const confirmMsg = await msg.channel.send(`${purgeCollect.size - 1} messages succesfully deleted.`);

		setTimeout(() => confirmMsg.delete(), 5000);

		return;
	}

}
