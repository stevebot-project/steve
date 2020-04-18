import { SteveClient } from '@lib/SteveClient';
import { User } from 'discord.js';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { ScheduledTask, SettingsUpdateResult } from 'klasa';

export class PomodoroManager {

	public client: SteveClient;
	public user: User;

	public constructor(user: User) {
		this.client = user.client as SteveClient;
		this.user = user;
	}

	public get currentSegment(): string | null {
		const currentSegment = this.user.settings.get(UserSettings.Pomodoro.CurrentSegment);
		return this.running ? currentSegment : null;
	}

	public get friendlyCurrentSegment(): string | null{
		return this.currentSegment === 'work'
			? 'work period'
			: this.currentSegment === 'short'
				? 'short break'
				: this.currentSegment === 'long'
					? 'long break'
					: null;
	}

	public get longBreakSegmentLength(): number {
		return this.user.settings.get(UserSettings.Pomodoro.LongBreakTime);
	}

	public get running(): boolean {
		return this.user.settings.get(UserSettings.Pomodoro.Running);
	}

	public get shortBreakSegmentLength(): number {
		return this.user.settings.get(UserSettings.Pomodoro.ShortBreakTime);
	}

	public get workRoundNumber(): number {
		return this.user.settings.get(UserSettings.Pomodoro.WorkRoundNumber);
	}

	public get workSegmentLength(): number {
		return this.user.settings.get(UserSettings.Pomodoro.WorkTime);
	}

	public async createPomodoroTask(segmentLength: number): Promise<ScheduledTask> {
		return this.client.schedule.create('pomodoroSegmentEnd', Date.now() + segmentLength, {
			catchUp: true,
			data: { user: this.user.id }
		});
	}

	public getPomodoroTask(): ScheduledTask {
		// eslint-disable-next-line id-length
		const task = this.client.schedule.tasks.filter(t => t.taskName === 'pomodoroSegmentEnd' && t.data.user === this.user.id)[0];
		return task || null;
	}

	public async incrementWorkRoundNumber(): Promise<SettingsUpdateResult> {
		return this.workRoundNumber <= 3
			? await this.user.settings.update(UserSettings.Pomodoro.WorkRoundNumber, this.workRoundNumber + 1)
			: await this.user.settings.update(UserSettings.Pomodoro.WorkRoundNumber, 1);
	}

	public async startPomodoroTimer(): Promise<[ScheduledTask, SettingsUpdateResult, SettingsUpdateResult]> {
		return Promise.all([
			this.createPomodoroTask(this.workSegmentLength),
			this.user.settings.update(UserSettings.Pomodoro.CurrentSegment, 'work'),
			this.user.settings.update(UserSettings.Pomodoro.Running, true)
		]);
	}

	public async reset(): Promise<SettingsUpdateResult[]> {
		const task = this.getPomodoroTask();
		await task.delete();
		return Promise.all(
			[this.user.settings.reset(UserSettings.Pomodoro.WorkRoundNumber),
				this.user.settings.reset(UserSettings.Pomodoro.CurrentSegment),
				this.user.settings.reset(UserSettings.Pomodoro.Running)]);
	}

}
