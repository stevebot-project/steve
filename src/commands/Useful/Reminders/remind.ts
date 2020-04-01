import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { friendlyDuration } from '@lib/util/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['remindme'],
			description: 'Set personal reminders for yourself.',
			examples: ['remind make steve suck less|1 hour'],
			extendedHelp: 'If you set a reminder in a DM with Steve, he will remind you in the DM.',
			usage: '<reminder:string{,140}> <duration:timespan>',
			helpUsage: 'what | when'
		});
	}

	public async run(msg: KlasaMessage, [reminder, duration]: [string, number]): Promise<Message> {
		const userReminders = await this.client.schedule.getUserReminders(msg.author.id);
		if (userReminders.length > 25) {
			throw 'There\'s a maximum of 25 reminders... and you\'ve got 25.';
		}

		const reminderChannel = msg.guild ? msg.guild.settings.get(GuildSettings.Channels.ReminderChannel) : null;

		this.client.schedule.create('reminder', Date.now() + duration, {
			data: {
				user: msg.author.id,
				content: reminder,
				channel: msg.channel instanceof TextChannel && reminderChannel ? reminderChannel : msg.channel.id
			},
			catchUp: true
		});

		const prettyDuration = friendlyDuration(duration);

		return msg.channel.send(`${msg.author}, I'll remind you about that in ${prettyDuration}.`);
	}

}
