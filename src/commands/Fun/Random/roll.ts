import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { oneLine } from 'common-tags';

const DICE_REGEX = /(?<count>\d{1,2})?d(?<sides>\d{1,4})(?<explode>!)?(?<keep>kl?(?<keepCount>\d{1,2}))?((?<plus>\+)?(?<minus>-)?(?<mod>\d{1,2})|$)/;

type KeepType = 'highest' | 'lowest' | false;

type ModType = '+' | '-' | '';

interface RollSpec {
	input: string;
	count: number;
	sides: number;
	operator: ModType;
	mod: number;
	explodes: boolean;
	keep: KeepType;
	keepCount?: number;
}

interface DiceResult {
	spec: RollSpec;
	rolls: number[];
	message: string;
}

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['dice'],
			description: 'Roll dice!',
			examples: ['roll 1d6', 'roll d20', 'roll 5d10!', 'roll 1d8|4d6', 'roll 6d12k1', 'roll 6d12kl2'],
			extendedHelp: oneLine`Use standard dice notation. You can roll up to 10 dice with up to 1,000 sides each.
				Add a \`!\` at the end of your roll to use exploding dice.
				To keep the highest n, add \`k<n>\`; to keep the lowest n, add \`kl<n>\` (with n < amount of dice).
				You can do multiple rolls at once, separated by \`|\`.`,
			usage: '<spec:dice> [...]',
			helpUsage: '<number of dice>d<number of sides>'
		});

		this.customizeResponse('roll', 'You can roll up to 10 dice with up to 1,000 sides each.');

		this.createCustomResolver('dice', (arg): RollSpec => {
			const match = DICE_REGEX.exec(arg);

			let count = parseInt(match.groups.count, 10) ?? 1;
			if (isNaN(count)) count = 1;
			else if (count > 10) count = 10;

			let sides = parseInt(match.groups.sides, 10);
			if (sides > 1000) sides = 1000;

			let mod = parseInt(match.groups.mod, 10);
			if (mod > 99) mod = 99;

			let operator: ModType = '';
			const explodes = match.groups.explode === '!';
			if (match.groups.minus === '-') {
				operator = '-';
			} else if (match.groups.plus === '+') {
				operator = '+';
			}

			let keep: KeepType = false;
			if (match.groups.keep) {
				const keepLowest = match.groups.keep.includes('l');
				if (keepLowest) keep = 'lowest';
				else keep = 'highest';
			}

			const keepCount = parseInt(match.groups.keepCount, 10);

			return { input: match.input, count, sides, operator, mod, explodes, keep, keepCount };
		});
	}

	public async run(msg: KlasaMessage, specs: RollSpec[]): Promise<Message> {
		const results: DiceResult[] = [];

		for (const spec of specs) {
			let rolls = [];
			let lost = [];
			let message = '';
			let operator = '';

			if (spec.operator === '+') { operator = '+'; }
			const shift = this.getMod(spec.operator, spec.mod);

			for (let i = 0; i < spec.count; i++) {
				const roll = this.roll(spec.sides, spec.explodes);
				rolls.push(roll);
			}

			const len = rolls.length;

			if (spec.keep) {
				rolls.sort();
				if (spec.keep === 'highest') rolls.reverse();
				lost = rolls.slice(spec.keepCount);
				rolls = rolls.slice(0, spec.keepCount);
			}

			if (len === 1) {
				const roll = rolls[0];
				message = `**${roll}**`;
				if (shift !== 0) {
					const sum = roll + shift;
					message = `_${message} ${operator} ${shift}_ = **${sum}**`;
				}
			} else {
				let sum = 0;
				for (const roll of rolls) {
					sum += roll;
				}
				if (lost.length !== 0) {
					message = `(~~${lost.join(',')}~~ ${rolls.join('+')})`;
				} else {
					message = `(${rolls.join('+')})`;
				}
				if (shift !== 0) {
					sum += shift;
					message = `_${message} ${operator} ${shift}_`;
				} else {
					message = `_${message}_`;
				}
				message += ` = ** ${sum}**`;
			}

			results.push({ spec, rolls, message });
		}

		const getEmoji = (spec): string => {
			if (spec.keep === 'highest') return '👍';
			if (spec.keep === 'lowest') return '👎';
			if (spec.explodes) return '💥';
			return '🎲';
		};

		if (results.length === 1) {
			const result = results[0];
			const emoji = getEmoji(result.spec);
			const message = `${emoji} You rolled: ${result.message} ${emoji}`;
			return msg.channel.send(message);
		} else {
			let message = 'You rolled:';
			for (const result of results) {
				const emoji = getEmoji(result.spec);
				message += `\n${emoji} ${result.spec.input}: ${result.message}`;
			}
			return msg.channel.send(message);
		}
	}

	private rollOnce(sides: number): number {
		return Math.floor(Math.random() * sides) + 1;
	}

	private getMod(operator: ModType, mod: number): number {
		let modifier = 0;
		// minus is worse so takes precedence
		if (operator === '-') {
			modifier -= mod;
		} else if (operator === '+') {
			modifier += mod;
		}
		return modifier;
	}

	private roll(sides: number, explodes: boolean): number {
		let total = 0;
		let roll = 0;

		if (sides <= 1) {
			total = 1;
		}

		if (explodes) {
			do {
				roll = this.rollOnce(sides);
				total += roll;
			} while (
				roll === sides
				&& roll < 1e6 // prevent an infinite loop, just in case
			);
		} else {
			total = this.rollOnce(sides);
		}

		return total;
	}

}
