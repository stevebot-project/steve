/* eslint-disable @typescript-eslint/require-await */
import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => ({
	moduleDirectories: [
		'src',
		'node_modules'
	],
	testEnvironment: 'node',
	testMatch: ['<rootDir>/tests/**/*.test.ts'],
	testRunner: 'jest-circus/runner',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	verbose: true
});
