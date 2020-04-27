import { Structures } from 'discord.js';
import { PomodoroManager } from '@lib/structures/PomodoroManager';

export class SteveUser extends Structures.get('User') {

	public readonly pomodoro: PomodoroManager = new PomodoroManager(this);

}

Structures.extend('User', () => SteveUser);
