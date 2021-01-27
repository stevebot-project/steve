import { Event } from 'klasa';
import { checkWinner, chooseRandomPlay, rpsPlay } from '@lib/util/RockPaperScissors';
import { Guild, GuildChannel } from 'discord.js';

export default class extends Event {

	public run(guild: Guild, channel: GuildChannel, playerPlay: rpsPlay) {
		if (channel.isText()) {
			const stevePlay = chooseRandomPlay();
			const winner = checkWinner(stevePlay, playerPlay);
			return channel.send(guild.language.tget('commandRockPaperScissorsWinner', playerPlay, stevePlay, winner));
		}
	}

}
