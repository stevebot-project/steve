import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage, ScheduledTask, SettingsUpdateResult } from 'klasa';
import { Message, ColorResolvable } from 'discord.js';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { friendlyDuration, newEmbed } from '@lib/util/util';
import { oneLine } from 'common-tags';
import { Colors } from '@lib/types/enums';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['pomo', 'pom'],
			description: 'Be productive with the pomodoro technique!',
			examples: ['pomo start', 'pomo end', 'pomo check', 'pomo show', 'pomo set|work|25m', 'pomo set|short|5m', 'pomo set|long|15m'],
			extendedHelp: oneLine`This command helps faciliate use of the
				[pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). Note that if you change the length of a work cycle
				or break while that cycle is happening, the change will not take effect until the next time that cycle occurs.`,
			helpUsage: '*start*/*check*/*end*/*show*/*set*  (segment|duration)',
			subcommands: true,
			usage: '<start|check|end|show|set> (segment:pomSegment) (duration:timespan)'
		});

		this
			.createCustomResolver('pomSegment', (str, possible, msg, [action]) => {
				if (action !== 'set') return null;
				const beefsteak = ['work', 'long', 'short']; // thank allison for the variable name
				if (!beefsteak.includes(str)) throw `**${str}** is not a valid segment name.`;
				return str;
			})
			.createCustomResolver('timespan', (str, possible, msg, [action]) =>
				action === 'set' ? this.client.arguments.get('timespan').run(str, possible, msg) : null);
	}

	public async start(msg: KlasaMessage): Promise<[[ScheduledTask, SettingsUpdateResult, SettingsUpdateResult], SettingsUpdateResult, Message]> {
		if (msg.author.pomodoro.running) throw 'Your pomodoro timer is already running! Get back to work smh';

		return Promise.all([
			msg.author.pomodoro.startPomodoroTimer(),
			msg.author.pomodoro.incrementWorkRoundNumber(),
			msg.channel.send('Starting your pomodoro timer. You got this; get after it!')]);
	}

	public async check(msg: KlasaMessage): Promise<Message> {
		const task = msg.author.pomodoro.getPomodoroTask();
		if (!task) throw 'You\'re not currently pomodoroing!';

		return msg.channel.send(oneLine`You have ${friendlyDuration(task.time.getTime() - Date.now())} left in your
			${msg.author.pomodoro.friendlyCurrentSegment}!`);
	}

	public async end(msg: KlasaMessage): Promise<Message> {
		if (!msg.author.pomodoro.running) throw 'You\'re not currently pomodoroing!';
		await msg.author.pomodoro.reset();
		return msg.channel.send('Your pomodoro timer has ended. Great job!');
	}

	public async show(msg: KlasaMessage): Promise<Message> {
		const workLength = friendlyDuration(msg.author.pomodoro.workSegmentLength);
		const shortLength = friendlyDuration(msg.author.pomodoro.shortBreakSegmentLength);
		const longLength = friendlyDuration(msg.author.pomodoro.longBreakSegmentLength);

		const embed = newEmbed()
			.addFields(
				{ name: 'Work Cycle', value: workLength, inline: true },
				{ name: 'Short Break', value: shortLength, inline: true },
				{ name: 'Long Break', value: longLength, inline: true }
			)
			.setColor(msg.author.settings.get(UserSettings.EmbedColor) as ColorResolvable || Colors.YellowGreen)
			.setTitle(`Pomodoro Settings for ${msg.author.tag}`);

		return msg.channel.send(embed);
	}

	public async set(msg: KlasaMessage, [pomType, duration]: [string, number]): Promise<[SettingsUpdateResult, Message]> {
		let update: string;
		let friendlySegmentName: string;

		switch (pomType) {
			case 'work':
				update = UserSettings.Pomodoro.WorkTime;
				friendlySegmentName = 'work period';
				break;
			case 'long':
				update = UserSettings.Pomodoro.LongBreakTime;
				friendlySegmentName = 'long break';
				break;
			case 'short':
				update = UserSettings.Pomodoro.ShortBreakTime;
				friendlySegmentName = 'short break';
				break;
		}

		return Promise.all([
			msg.author.settings.update(update, duration),
			msg.channel.send(`You've updated your ${friendlySegmentName} length to ${friendlyDuration(duration)}.`)
		]);
	}

}
