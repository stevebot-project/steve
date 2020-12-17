import { CommandStore, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { plays, checkWinner, chooseRandomPlay } from '@lib/util/RockPaperScissors';

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
		const steveMove = chooseRandomPlay();
		const winner = checkWinner(plays.indexOf(playerMove), plays.indexOf(steveMove));
		return msg.channel.send(msg.language.tget('COMMAND_ROCKPAPERSCISSORS_WINNER', playerMove, steveMove, winner));
	}

}
