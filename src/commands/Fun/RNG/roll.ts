import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

const DICE_REGEX = /(?<count>\d{1,2})?d(?<sides>\d{1,4})(?<explode>!)?(?<keep>kl?(?<keepCount>\d{1,2}))?/;

type KeepType = 'highest' | 'lowest' | false;

interface RollSpec {
	input: string;
	count: number;
	sides: number;
	explodes: boolean;
	keep: KeepType;
	keepCount?: number;
}

interface DiceResult {
	spec: RollSpec;
	rolls: number[];
}

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['dice'],
			description: lang => lang.tget('COMMAND_ROLL_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_ROLL_EXTENDED'),
			usage: '<spec:dice> [...]'
		});

		this.createCustomResolver('dice', (arg): RollSpec => {
			const match = DICE_REGEX.exec(arg);

			let count = parseInt(match!.groups!.count, 10) ?? 1;
			if (isNaN(count)) count = 1;
			else if (count > 10) count = 10;

			let sides = parseInt(match!.groups!.sides, 10);
			if (sides > 1000) sides = 1000;

			const explodes = match!.groups!.explode === '!';

			let keep: KeepType = false;
			if (match!.groups!.keep) {
				const keepLowest = match!.groups!.keep.includes('l');
				if (keepLowest) keep = 'lowest';
				else keep = 'highest';
			}

			const keepCount = parseInt(match!.groups!.keepCount, 10);

			return { input: match!.input, count, sides, explodes, keep, keepCount };
		});
	}

	public async run(msg: KlasaMessage, specs: RollSpec[]): Promise<Message> {
		const results: DiceResult[] = [];

		for (const spec of specs) {
			let rolls = [];
			for (let i = 0; i < spec.count; i++) {
				const roll = this.roll(spec.sides, spec.explodes);
				rolls.push(roll);
			}

			if (spec.keep) {
				rolls.sort();
				if (spec.keep === 'highest') rolls.reverse();
				rolls = rolls.slice(0, spec.keepCount);
			}

			results.push({ spec, rolls });
		}

		const getEmoji = (spec: RollSpec): string => {
			if (spec.keep === 'highest') return '👍';
			if (spec.keep === 'lowest') return '👎';
			if (spec.explodes) return '💥';
			return '🎲';
		};

		if (results.length === 1) {
			const result = results[0];
			const emoji = getEmoji(result.spec);
			const message = `${emoji} You rolled: \`${result.rolls.join(', ')}\` ${emoji}`;
			return msg.channel.send(message);
		}
		let message = 'You rolled:';
		for (const result of results) {
			const emoji = getEmoji(result.spec);
			message += `\n${emoji} ${result.spec.input}: \`${result.rolls.join(', ')}\``;
		}
		return msg.channel.send(message);

	}

	private rollOnce(sides: number): number {
		return Math.floor(Math.random() * sides) + 1;
	}

	private roll(sides: number, explodes: boolean): number {
		if (sides <= 1) return 1; // this one is easy

		if (explodes) {
			let total = 0;
			let roll = 0;
			do {
				roll = this.rollOnce(sides);
				total += roll;
			} while (
				roll === sides
				&& roll < 1e6 // prevent an infinite loop, just in case
			);
			return total;
		}
		return this.rollOnce(sides);

	}

}
