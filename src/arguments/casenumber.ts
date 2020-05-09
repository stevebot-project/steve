import { Argument, Possible, KlasaMessage } from 'klasa';
import { ModerationCase } from '@lib/structures/moderation/ModerationManager';

export default class extends Argument {

	public async run(arg: string, possible: Possible, msg: KlasaMessage): Promise<ModerationCase> {
		const num = parseInt(arg, 10);
		if (isNaN(num)) throw `**${arg}** is not a valid case number.`;
		if (num > msg.guild.moderation.cases.length) throw `There is no case with the number ${num}`;
		return msg.guild.moderation.cases[num - 1];
	}

}
