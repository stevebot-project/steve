import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { friendlyDuration } from '@lib/util/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['remindme'],
			description: lang => lang.get('COMMAND_REMIND_DESCRIPTION'),
			examples: ['remind make steve suck less|1 hour'],
			extendedHelp: lang => lang.get('COMMAND_REMIND_EXTENDEDHELP'),
			usage: '<reminder:string{,140}> <duration:timespan>',
			helpUsage: 'what | when'
		});
	}

	public async run(msg: KlasaMessage, [reminder, duration]: [string, number]): Promise<Message> {
		const userReminders = await this.client.schedule.getUserReminders(msg.author.id);
		if (userReminders.length > 25) {
			throw msg.language.get('COMMAND_REMIND_TOO_MANY_REMINDERS');
		}

		const reminderChannel = msg.guild ? msg.guild.settings.get(GuildSettings.Channels.ReminderChannel) : null;

		await this.client.schedule.createReminderTask(msg.author.id, reminder, duration, msg.channel instanceof TextChannel && reminderChannel ? reminderChannel : msg.channel.id);

		return msg.channel.send(`${msg.author}, I'll remind you about that in ${friendlyDuration(duration)}.`);
	}

}
