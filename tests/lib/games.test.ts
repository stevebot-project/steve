/* eslint-disable no-undef */
import { checkWinner } from '../../src/lib/util/RockPaperScissors';

describe('RockPaperScissors', () => {
	describe('checkWinner', () => {
		test('GIVEN draw THEN return 0', () => {
			const expectedResult = 0;

			expect(checkWinner('rock', 'rock')).toBe(expectedResult);
			expect(checkWinner('paper', 'paper')).toBe(expectedResult);
			expect(checkWinner('scissors', 'scissors')).toBe(expectedResult);
		});

		test('GIVEN bot win THEN return -1', () => {
			const expectedResult = -1;

			expect(checkWinner('rock', 'scissors')).toBe(expectedResult);
			expect(checkWinner('paper', 'rock')).toBe(expectedResult);
			expect(checkWinner('scissors', 'paper')).toBe(expectedResult);
		});

		test('GIVEN player win THEN return 1', () => {
			const expectedResult = 1;

			expect(checkWinner('rock', 'paper')).toBe(expectedResult);
			expect(checkWinner('paper', 'scissors')).toBe(expectedResult);
			expect(checkWinner('scissors', 'rock')).toBe(expectedResult);
		});
	});
});
