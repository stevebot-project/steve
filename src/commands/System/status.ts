import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { NAME } from '@root/config';
import { PermissionLevels } from '@lib/types/enums';
import { CommandStore, KlasaMessage } from 'klasa';
import { Presence } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_STATUS_DESCRIPTION'),
			permissionLevel: PermissionLevels.OWNER,
			usage: '<online|idle|dnd|invisible>'
		});
	}

	public async run(msg: KlasaMessage, [status]: ['online' | 'idle' | 'dnd' | 'invisible']): Promise<Presence> {
		return this.client.user.setStatus(status);
	}

}
