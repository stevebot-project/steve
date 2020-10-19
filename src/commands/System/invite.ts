import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_INVITE_DESCRIPTION'),
			guarded: true
		});
	}

	public async run(msg: KlasaMessage) {
		return msg.sendLocale('COMMAND_INVITE');
	}

	public async init() {
		if (this.client.application && !this.client.application.botPublic) this.permissionLevel = PermissionsLevels.OWNER;
	}

}
