import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { NAME } from '@root/config';
const rps = ['rock', 'paper', 'scissors'];

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['rps'],
			description: `Play rock, paper, scissors against ${NAME}.`,
			examples: ['rps rock', 'rockpaperscissors paper'],
			usage: '<rock|paper|scissors>',
			helpUsage: '*rock* OR *paper* OR *scissors*'
		});
	}

	public async run(msg: KlasaMessage, [playerMove]: [string]): Promise<Message> {
		const steveMove = rps[Math.floor(Math.random() * rps.length)];

		const winner = this.checkWinner(rps.indexOf(playerMove), rps.indexOf(steveMove));

		return msg.channel.send(`You threw ${playerMove} and ${NAME} threw ${steveMove}. ${winner} won!`);
	}

	private checkWinner(playerNum: number, steveNum: number): string {
		if (playerNum === steveNum) return 'Nobody';
		if ((playerNum > steveNum && playerNum - steveNum === 1) || (steveNum > playerNum && steveNum - playerNum === 2)) return 'You';
		return NAME;
	}

}
