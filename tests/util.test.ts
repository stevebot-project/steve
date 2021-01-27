/* eslint-disable no-undef */

import { formatDate, friendlyDuration } from '../src/lib/util/util';
import { Time } from '../src/lib/types/Enums';

describe('Util', () => {

	describe('formatDate', () => {
		const mockDate = new Date(2017, 0, 25); // mock date for consistent result
		const mockTimestamp = mockDate.getTime();

		test('GIVEN only date or timestamp THEN return default format', () => {
			const expectedResult = '2017 Jan 25th';

			expect(formatDate(mockDate)).toBe(expectedResult);
			expect(formatDate(mockTimestamp)).toBe(expectedResult);
		});

		test('GIVEN date and format THEN return proper format', () => {
			const testFormat = 'MMMM DD YY';
			const expectedResult = 'January 25 17';

			expect(formatDate(mockDate, testFormat)).toBe(expectedResult);
			expect(formatDate(mockTimestamp, testFormat)).toBe(expectedResult);
		});
	});

	describe('friendlyDuration', () => {
		test('GIVEN number THEN return correctly formatted readable string', () => {
			expect(friendlyDuration(Time.SECOND)).toBe('1 second');
			expect(friendlyDuration(Time.MINUTE * 2)).toBe('2 minutes');
			expect(friendlyDuration(Time.HOUR * 3)).toBe('3 hours');
			expect(friendlyDuration(Time.DAY * 4)).toBe('4 days');
		});
	});

});
