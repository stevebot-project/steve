import { KlasaMessage } from 'klasa';
import { SteveCommand, SteveCommandOptions } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { checkWinner, chooseRandomPlay, rpsPlay } from '@lib/util/RockPaperScissors';
import { ApplyOptions } from '@skyra/decorators';
import { ApplicationCommands } from '@lib/types/Enums';

@ApplyOptions<SteveCommandOptions>({
	aliases: ['rps'],
	cooldown: 5,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandRockPaperScissorsDescription'),
	deprecatedForSlash: ApplicationCommands.Rps,
	extendedHelp: lang => lang.tget('commandRockPaperScissorsExtended'),
	usage: '<rock|paper|scissors>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [playerMove]: [rpsPlay]): Promise<Message> {
		const steveMove = chooseRandomPlay();
		const winner = checkWinner(steveMove, playerMove);
		return msg.channel.send(msg.language.tget('commandRockPaperScissorsWinner', playerMove, steveMove, winner));
	}

}
