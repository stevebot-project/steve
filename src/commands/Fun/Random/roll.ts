import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { oneLine } from 'common-tags';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['dice'],
			description: 'Roll dice!',
			examples: ['roll 1d6', 'roll d20', 'roll 5d10!'],
			extendedHelp: oneLine`Use standard dice notation. You can add a "!" at the end of your roll to use exploding dice. You can roll
				up to 10 dice with up to 1,000 sides each.`,
			usage: '<roll:reg/(?<dice>\\d{1,2})?d(?<sides>\\d{1,4})(?<explode>!)?/>',
			helpUsage: '[1-9]d[1-999] (!)'
		});

		this
			.customizeResponse('roll', 'You can roll up to 10 dice with up to 1,000 sides each.');
	}

	public async run(msg: KlasaMessage, [match]: [any]): Promise<Message> { // eslint-disable-line @typescript-eslint/no-explicit-any
		let dice = parseInt(match.groups.dice);
		if (isNaN(dice)) dice = 1;
		else dice = dice <= 10 ? dice : 10;

		let sides = parseInt(match.groups.sides);
		sides = sides <= 1000 ? sides : 1000;

		const explodes = match.groups.explode === '!';
		const finishedRolls = [];
		const emoji = explodes ? '💥' : '🎲';

		for (let i = 0; i < dice; i++) {
			let roll = await this.roll(sides);

			if (explodes && roll === sides) roll += await this.roll(sides);

			finishedRolls.push(roll);
		}

		return msg.channel.send(`${emoji} You rolled: \`${finishedRolls.join(', ')}\` ${emoji}`);
	}

	private async roll(num: number): Promise<number> {
		return Math.floor(Math.random() * num) + 1;
	}

}
