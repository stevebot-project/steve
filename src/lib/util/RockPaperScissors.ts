const plays = ['rock', 'paper', 'scissors'] as const;

/**
 *
 * @param stevePlay rock, paper, or scissors
 * @param playerPlay rock, paper, or scissors
 * @returns 0 for a draw, -1 for a bot win, 1 for a player win
 */
export function checkWinner(stevePlay: rpsPlay, playerPlay: rpsPlay) {
	const stevePlayNum = plays.indexOf(stevePlay);
	const playerPlayNum = plays.indexOf(playerPlay);

	if (stevePlayNum === playerPlayNum) return 0;

	const adjacent = Math.abs(stevePlayNum - playerPlayNum) === 1;

	if (stevePlayNum > playerPlayNum) {
		return adjacent
			? -1
			: 1;
	}

	return adjacent
		? 1
		: -1;
}

export function chooseRandomPlay() {
	return plays[Math.floor(Math.random() * plays.length)];
}

export type rpsPlay = typeof plays[number];
