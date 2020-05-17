import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { Message } from 'discord.js';
import { ModerationCase } from '@lib/structures/moderation/ModerationManager';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Edit the reason field for a case.',
			examples: ['reason 1|trolling'],
			helpUsage: 'case number|new reason',
			permissionLevel: PermissionLevels.MODERATOR,
			usage: '<caseNumber:casenumber> <newReason:string>'
		});
	}

	public async run(msg: KlasaMessage, [thisCase, newReason]: [ModerationCase, string]): Promise<Message> {
		await msg.guild.moderation.editCaseReason(thisCase.number, newReason);

		return msg.channel.send(`The reason field for case ${thisCase.number} has been updated to: ${newReason}`);
	}

}
