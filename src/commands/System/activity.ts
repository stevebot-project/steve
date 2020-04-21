import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { NAME } from '@root/config';
import { PermissionLevels } from '@lib/types/enums';
import { CommandStore, KlasaMessage } from 'klasa';
import { Presence } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: `Change ${NAME}'s activity on Discord.`,
			permissionLevel: PermissionLevels.OWNER,
			usage: '<PLAYING|WATCHING|LISTENING> <activity:string>'
		});
	}

	public async run(msg: KlasaMessage, [activityType, activity]: ['PLAYING' | 'WATCHING' | 'LISTENING', string]): Promise<Presence> {
		return this.client.user.setActivity(activity, { type: activityType });
	}

}
