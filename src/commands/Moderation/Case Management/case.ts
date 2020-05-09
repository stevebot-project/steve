import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { Message } from 'discord.js';
import { ModerationCase } from '@lib/structures/moderation/ModerationManager';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'View a specific case using the case number.',
			permissionLevel: PermissionLevels.MODERATOR,
			usage: '<caseNumber:casenumber>'
		});
	}

	public async run(msg: KlasaMessage, [thisCase]: [ModerationCase]): Promise<Message> {
		return msg.channel.send(msg.guild.moderation.displayCase(thisCase));
	}

}
