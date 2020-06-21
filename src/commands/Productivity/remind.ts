import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage, ScheduledTask } from 'klasa';
import { Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { friendlyDuration, buildEmbed } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['remindme', 'reminders', 'myreminders'],
			description: lang => lang.get('COMMAND_REMIND_DESCRIPTION'),
			extendedHelp: lang => lang.get('COMMAND_REMIND_EXTENDED'),
			subcommands: true,
			usage: '<view|cancel|create:default> (reminder:reminder) (duration:timespan)'
		});

		this
			.createCustomResolver('reminder', (str, possible, msg, [action]) => {
				if (action === 'view') return null;
				if (action === 'create') {
					if (str.length <= 140) return str;
					throw msg.language.get('RESOLVER_REMINDER_LENGTH');
				}

				const reminders = this.client.schedule.getUserReminders(msg.author.id);
				const reminderNum = parseInt(str, 10);
				if (isNaN(reminderNum) || reminders.length < reminderNum) throw msg.language.get('RESOLVER_REMINDER_INVALID', str);
				return reminderNum;
			})
			.createCustomResolver('timespan', (str, possible, msg, [action]) => {
				if (action === 'view' || action === 'cancel') return null;
				return this.client.arguments.get('timespan').run(str, possible, msg);
			});
	}

	public async create(msg: KlasaMessage, [reminder, duration]: [string, number]): Promise<Message> {
		const reminderChannel = msg.guild ? msg.guild.settings.get(GuildSettings.Channels.ReminderChannel) : null;

		await this.client.schedule.createReminder(duration, msg.author.id, reminder, msg.channel instanceof TextChannel && reminderChannel ? reminderChannel : msg.channel.id);

		return msg.channel.send(msg.language.get('COMMAND_REMIND_CREATED', friendlyDuration(duration)));
	}

	public async view(msg: KlasaMessage): Promise<Message> {
		let output = '';
		const reminders = this.client.schedule.getUserReminders(msg.author.id);
		if (reminders.length < 1) throw msg.language.get('COMMAND_REMIND_NOREMIDNERS');

		for (let i = 0; i < reminders.length; i++) {
			const reminder = reminders[i];
			const display = await this.getReminderDisplayContent(msg, reminder);
			output += `**${i + 1}**: ${display}\n\n`;
		}

		return msg.channel.send(buildEmbed().setDescription(output));
	}

	private async getReminderDisplayContent(msg: KlasaMessage, reminder: ScheduledTask): Promise<string> {
		const reminderUser = await this.client.users.fetch(msg.author.id);
		if (!reminderUser.dmChannel) return reminder.data.content;
		return reminder.data.channel === reminderUser.dmChannel.id && msg.channel.id !== reminderUser.dmChannel.id
			? msg.language.get('COMMAND_REMINDER_DISPLAY_HIDDEN')
			: reminder.data.content;
	}

}
