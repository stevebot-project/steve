import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';

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

interface ExplodingResult {
	roll: number;
	msgText: string;
}

interface DiceResult {
	spec: RollSpec;
	rolls: number[];
	message: string;
}

interface MessageSpec {
	message: string;
	rollValue: number;
}

// TypeScript sort() was not working correctly for our arrays
function Comparator(a: any, b: any): number {
	if (a[0] < b[0]) return -1;
	if (a[0] > b[0]) return 1;
	return 0;
}

function NumComparator(a: number, b: number): number {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}

@ApplyOptions<CommandOptions>({
	aliases: ['dice'],
	description: lang => lang.tget('commandRollDescription'),
	extendedHelp: lang => lang.tget('commandRollExtended'),
	usage: '<spec:dice> [...]'
})
@CreateResolvers([
	[
		'dice',
		(str): RollSpec => {
			const match = DICE_REGEX.exec(str);

			let count = parseInt(match!.groups!.count, 10) ?? 1;
			if (isNaN(count)) count = 1;
			else if (count > 10) count = 10;

			let sides = parseInt(match!.groups!.sides, 10);
			if (sides > 1000) sides = 1000;

			let mod = parseInt(match!.groups!.mod, 10);
			if (mod > 99) mod = 99;

			let operator: ModType = '';
			const explodes = match!.groups!.explode === '!';
			if (match!.groups!.minus === '-') {
				operator = '-';
			} else if (match!.groups!.plus === '+') {
				operator = '+';
			}

			let keep: KeepType = false;
			if (match!.groups!.keep) {
				const keepLowest = match!.groups!.keep.includes('l');
				if (keepLowest) keep = 'lowest';
				else keep = 'highest';
			}

			const keepCount = parseInt(match!.groups!.keepCount, 10);

			return { input: match!.input, count, sides, operator, mod, explodes, keep, keepCount };
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, specs: RollSpec[]): Promise<Message> {
		const results: DiceResult[] = [];

		for (const spec of specs) {
			let rolls: number[] = [];
			let msgs: MessageSpec[] = [];
			let lost: number[] = [];
			let message = '';
			let operator = '';

			// The minus sign is correctly prepended anyway but we need to prepend '+'
			// when we have a static, positive modifier
			if (spec.operator === '+') {
				operator = '+';
			}
			// get the value of the static modifier
			const shift = this.getMod(spec.operator, spec.mod);

			let msg: MessageSpec = { message: '', rollValue: 0 };
			for (let i = 0; i < spec.count; i++) {
				// in order to correctly print all values in an exploding number we
				// need to formulate a message, this uses a different roll function
				if (spec.explodes) {
					const { roll, msgText } = this.explodingRoll(spec.sides);
					// array of messages tied to total values
					msg = { message: msgText, rollValue: roll };
					msgs.push(msg);
					rolls.push(roll);
				} else {
					const roll = this.roll(spec.sides);
					// just an array of rolls
					rolls.push(roll);
				}
			}

			// Rolls length can change below so store this value for reference
			const len = rolls.length;

			if (spec.keep) {
				// sort using our better comparator
				rolls.sort(NumComparator);
				if (spec.keep === 'highest') rolls.reverse();
				// store 'lost' values prior to removing them from rolls
				lost = rolls.slice(spec.keepCount);
				rolls = rolls.slice(0, spec.keepCount);
				// exploding dice are a special case
				if (spec.explodes) {
					// Special array sort
					msgs.sort(Comparator);
					if (spec.keep === 'highest') msgs.reverse();
					// we could do 'lost' here but you don't want a big
					// list of ~~struck through~~ rolls being ignored
					msgs = msgs.slice(0, spec.keepCount);
				}
			}

			if (len === 1) {
				// single roll case
				const roll = rolls[0];
				if (spec.explodes) {
					// exploding rolls already have a pre-formatted message
					const msgText = msgs[0].message;
					message += msgText;
				} else {
					message += `${roll}`;
				}
				if (shift > 0 || shift < 0) {
					// calculate the final roll value
					const sum = roll + shift;
					// rolls are _italicised_, static modifier is plain, sum is **bold**
					message = `_${message}_${operator}${shift} = **${sum}**`;
				} else {
					// a signle roll is a **bold** result
					message = `**${message}**`;
				}
			} else {
				let sum = 0;
				if (lost.length !== 0) {
					// ~~struck through~~ list of ignored values
					// this is for completeness
					message += `~~${lost.join(',')}~~ `;
				}
				// length !== to final array index (so take 1 away)
				const checkLen = rolls.length - 1;
				// iterate over all rolls but get an index too
				for (const [index, roll] of rolls.entries()) {
					if (spec.explodes) {
						// exploding rolls already have a pre-formatted message
						const msgText = msgs[index].message;
						// sum values as we go
						sum += msgs[index].rollValue;
						message += msgText;
					} else {
						// sum values as we go
						sum += roll;
						message += `${roll}`;
					}
					if (index !== checkLen) {
						// show we are adding dice except on the final roll
						// (where we optional display a static mod)
						message += ' + ';
					}
				}
				if (shift > 0 || shift < 0) {
					// add the static modifier
					// in D&D you cannot roll lower than a 1 but this may not
					// be true _in general_ so we can cope with returning a
					// negative sum
					sum += shift;
					message = `_(${message})_${operator}${shift}`;
				} else {
					message = `_${message}_`;
				}
				message += ` = ** ${sum}**`;
			}

			results.push({ spec, rolls, message });
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
			// just display the message when a single roll is made
			return msg.channel.send(msg.language.tget('commandRollEmojiResponse', emoji, result.message));
		}
		let message = msg.language.tget('commandRollResponse');
		for (const result of results) {
			const emoji = getEmoji(result.spec);
			// for multiple rolls we want to make the input clear
			// backticks so it doesn't distract from results
			message += `\n${emoji} \`${result.spec.input}\` = ${result.message}`;
		}
		return msg.channel.send(message);

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

	private roll(sides: number): number {
		let total = 0;
		// assume the minimum roll of any die is 1
		if (sides <= 1) {
			total = 1;
		} else {
			total = this.rollOnce(sides);
		}

		return total;
	}

	private explodingRoll(sides: number): ExplodingResult {
		let total = 0;
		let roll = 0;
		let msgText = '';

		// assume the minimum roll of any die is 1
		// don't explode because that would be infinite
		if (sides <= 1) {
			total = 1;
		} else {
			do {
				roll = this.rollOnce(sides);
				total += roll;
				// format message here
				if (roll === sides && msgText === '') {
					// we explode for the first time and
					// start the explosion format
					msgText += '[💥';
					msgText += `**${roll}**+`;
				} else if (roll === sides) {
					// we exploded again and append
					msgText += `**${roll}**+`;
				} else if (msgText) {
					// we stopped exploding, final roll is
					// plainly formatted and display total
					msgText += `${roll}=${total}]`;
				} else {
					// didn't explode, boring message
					msgText = `${total}`;
				}
			} while (
				roll === sides
				&& roll < 1e6 // prevent an infinite loop, just in case
			);
		}

		return { roll: total, msgText };
	}

}
