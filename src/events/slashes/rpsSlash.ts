import { Event } from 'klasa';
import { checkWinner, chooseRandomPlay, plays } from '@lib/util/RockPaperScissors';
import { Guild, GuildChannel } from 'discord.js';

export default class extends Event {

	public run(guild: Guild, channel: GuildChannel, playerPlay: 'rock' | 'paper' | 'scissors') {
		if (channel.isText()) {
			const stevePlay = chooseRandomPlay();
			const winner = checkWinner(plays.indexOf(playerPlay), plays.indexOf(stevePlay));
			return channel.send(guild.language.tget('commandRockPaperScissorsWinner', playerPlay, stevePlay, winner));
		}
	}

}
