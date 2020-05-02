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
			description: lang => lang.get('COMMAND_MYREMINDERS_DESCRIPTION'),
			examples: ['myreminders', 'reminders cancel|1'],
			extendedHelp: lang => lang.get('COMMAND_MYREMINDERS_EXTENDEDHELP'),
			subcommands: true,
			usage: '<cancel|view:default> (reminder:reminder) [...]',
			helpUsage: '*view* OR *cancel*|reminder number|...'
		});

		this
			.createCustomResolver('reminder', async (str, possible, msg, [action]) => {
				if (action === 'view') return null;

				const num = parseInt(str, 10);
				if (!num) throw msg.language.get('COMMAND_MYREMINDERS_INVALID_NUMBER:');

				const reminders = await this.client.schedule.getUserReminders(msg.author.id);
				if (num > reminders.length) throw msg.language.get('COMMAND_MYREMINDERS_INVALID_LENGTH', reminders.length);

				return reminders[num - 1];
			});
	}

	public async cancel(msg: KlasaMessage, reminders: ScheduledTask[]): Promise<Message> {
		const content = [];

		reminders.forEach(async reminder => {
			content.push(`**${reminder.data.content}**`);

			await reminder.delete();
		});

		return msg.channel.send(`Cancelled the following reminder(s): ${content.join('; ')}.`);
	}

	public async view(msg: KlasaMessage): Promise<Message> {
		const targetUserReminders = await this.client.schedule.getUserReminders(msg.author.id);
		if (targetUserReminders.length < 1) throw msg.language.get('COMMAND_MYREMINDERS_NO_REMINDERS');

		const embed = newEmbed()
			.attachFiles(['./assets/images/alarmclock.png'])
			.setColor(msg.author.settings.get(UserSettings.EmbedColor) as ColorResolvable || Colors.YellowGreen)
			.setFooter(`To cancel a reminder, do "s;myreminders cancel|<reminder number>".`)
			.setTitle('Pending Reminders')
			.setThumbnail('attachment://alarmclock.png');

		targetUserReminders.forEach((reminder: ScheduledTask) => {
			embed
				.addFields([
					{ name: `**${targetUserReminders.indexOf(reminder) + 1}: ${reminder.data.content}**`,
						value: `${friendlyDuration(reminder.time.getTime() - Date.now())} left!` }
				]);
		});

		return msg.channel.send(embed);
	}

}
