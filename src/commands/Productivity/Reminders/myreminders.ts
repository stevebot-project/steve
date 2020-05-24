import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage, ScheduledTask } from 'klasa';
import { Message, ColorResolvable } from 'discord.js';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { Colors } from '@lib/types/enums';
import { friendlyDuration, newEmbed } from '@lib/util/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['reminders'],
			description: 'View or cancel your pending reminders.',
			examples: ['myreminders', 'reminders cancel|1'],
			extendedHelp: 'Use "view" to get a list of all of your active reminders. To cancel one or more reminders, use "cancel|rmdr1|rmdr2|...".',
			subcommands: true,
			usage: '<cancel|view:default> (reminder:reminder) [...]',
			helpUsage: '*view* OR *cancel*|reminder number|...'
		});

		this
			.createCustomResolver('reminder', async (str, possible, msg, [action]) => {
				if (action === 'view') return null;

				const num = parseInt(str, 10);
				if (!num) throw `You must provide a valid number.`;

				const reminders = await this.client.schedule.getUserReminders(msg.author.id);
				if (num > reminders.length) throw `You only have ${reminders.length} reminders set!`;

				return reminders[num - 1];
			});
	}

	public async cancel(msg: KlasaMessage, reminders: ScheduledTask[]): Promise<Message> {
		const content = [];

		reminders.forEach(async reminder => {
			const reminderDisplayContent = this.getReminderDisplayContent(reminder);

			content.push(`**${reminderDisplayContent}**`);

			await reminder.delete();
		});

		return msg.channel.send(`Cancelled the following reminder(s): ${content.join('; ')}.`);
	}

	public async view(msg: KlasaMessage): Promise<Message> {
		const targetUserReminders = await this.client.schedule.getUserReminders(msg.author.id);
		if (targetUserReminders.length < 1) throw `You don't have any pending reminders!`;

		const embed = newEmbed()
			.attachFiles(['./assets/images/alarmclock.png'])
			.setColor(msg.author.settings.get(UserSettings.EmbedColor) as ColorResolvable || Colors.YellowGreen)
			.setFooter(`To cancel a reminder, do "s;reminders cancel|<reminder number>".`)
			.setTitle('Pending Reminders')
			.setThumbnail('attachment://alarmclock.png');

		targetUserReminders.forEach((reminder: ScheduledTask) => {
			const reminderDisplayContent = this.getReminderDisplayContent(reminder);

			embed
				.addFields([
					{ name: `**${targetUserReminders.indexOf(reminder) + 1}: ${reminderDisplayContent}**`,
						value: `${friendlyDuration(reminder.time.getTime() - Date.now())} left!` }
				]);
		});

		return msg.channel.send(embed);
	}

	private getReminderDisplayContent(reminder: ScheduledTask): string {
		const reminderUser = this.client.users.cache.get(reminder.data.user);
		return reminder.data.channel === reminderUser.dmChannel.id ? 'Private reminder: content hidden' : reminder.data.content;
	}

}
