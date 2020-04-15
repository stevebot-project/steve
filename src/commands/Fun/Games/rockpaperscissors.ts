import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { NAME } from '@root/config';
const rps = ['rock', 'paper', 'scissors'];

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['rps'],
			description: lang => lang.get('COMMAND_RPS_DESCRIPTION', NAME),
			examples: ['rps rock', 'rockpaperscissors paper'],
			usage: '<rock|paper|scissors>',
			helpUsage: '*rock* OR *paper* OR *scissors*'
		});
	}

	public async run(msg: KlasaMessage, [playerMove]: [string]): Promise<Message> {
		const steveMove = rps[Math.floor(Math.random() * rps.length)];

		const winner = this.checkWinner(rps.indexOf(playerMove), rps.indexOf(steveMove), msg);

		return msg.channel.send(`${msg.language.get('COMMAND_RPS_MOVES', playerMove, steveMove, NAME)} ${winner}`);
	}

	private checkWinner(playerNum: number, steveNum: number, msg: KlasaMessage): string {
		if (playerNum === steveNum) return msg.language.get('COMMAND_RPS_WINER_NOBODY');
		if ((playerNum > steveNum && playerNum - steveNum === 1) || (steveNum > playerNum && steveNum - playerNum === 2)) {
			return msg.language.get('COMMAND_RPS_WINNER_PLAYER');
		} else {
			return msg.language.get('COMMAND_RPS_WINNER_STEVE', NAME);
		}
	}

}
