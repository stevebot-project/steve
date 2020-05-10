import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Edit the reason field for a case.',
			examples: ['reason 1|trolling'],
			helpUsage: 'case number|new reason',
			permissionLevel: PermissionLevels.MODERATOR,
			usage: '<caseNumber:integer> <newReason:string>'
		});
	}

	public async run(msg: KlasaMessage, [caseNumber, newReason]: [number, string]): Promise<Message> {
		const cases = msg.guild.moderation.cases.slice(); // slice to avoid mutating cache since we're changing a value
		if (cases.length < caseNumber) throw `There is no case with the number ${caseNumber}.`;

		await msg.guild.moderation.editCaseReason(caseNumber, newReason);

		return msg.channel.send(`The reason field for case ${caseNumber} has been updated to: ${newReason}`);
	}

}
