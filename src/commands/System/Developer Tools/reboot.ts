import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_REBOOT_DESCRIPTION'),
			guarded: true,
			permissionLevel: PermissionsLevels.OWNER
		});
	}

	public async run(msg: KlasaMessage) {
		await msg.sendLocale('COMMAND_REBOOT').catch(err => this.client.emit('error', err));
		await Promise.all(this.client.providers.map(provider => provider.shutdown()));
		process.exit();
	}

}
