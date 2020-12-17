export const plays = ['rock', 'paper', 'scissors'];

export function checkWinner(stevePlay: number, playerPlay: number) {
	if (playerPlay === stevePlay) return 0; // nobody
	if ((playerPlay > stevePlay && playerPlay - stevePlay === 1) || (stevePlay > playerPlay && stevePlay - playerPlay === 2)) {
		return -1; // player
	}
	return 1; // bot
}

export function chooseRandomPlay() {
	return plays[Math.floor(Math.random() * plays.length)];
}
