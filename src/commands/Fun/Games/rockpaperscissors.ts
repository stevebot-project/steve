import { CommandStore, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
const rps = ['rock', 'paper', 'scissors'];

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['rps'],
			cooldown: 5,
			cooldownLevel: 'author',
			description: lang => lang.tget('COMMAND_ROCKPAPERSCISSORS_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_ROCKPAPERSCISSORS_EXTENDED'),
			usage: '<rock|paper|scissors>'
		});
	}

	public async run(msg: KlasaMessage, [playerMove]: [string]): Promise<Message> {
		const steveMove = rps[Math.floor(Math.random() * rps.length)];
		const winner = this.checkWinner(rps.indexOf(playerMove), rps.indexOf(steveMove));
		return msg.channel.send(msg.language.tget('COMMAND_ROCKPAPERSCISSORS_WINNER', playerMove, steveMove, winner));
	}

	private checkWinner(playerNum: number, steveNum: number): number {
		if (playerNum === steveNum) return 0; // nobody
		if ((playerNum > steveNum && playerNum - steveNum === 1) || (steveNum > playerNum && steveNum - playerNum === 2)) {
			return 1; // player
		}
		return -1; // bot
	}

}
