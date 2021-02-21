import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage, RichDisplay } from 'klasa';
import { ColorResolvable, EmbedField, Message, MessageEmbed, TextChannel } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Reminder } from '@root/src/extendables/Schedule';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { chunk } from '@klasa/utils';
import * as prettyMilliseconds from 'pretty-ms';
import { floatPromise } from '@utils/util';

@ApplyOptions<CommandOptions>({
	aliases: ['remindme', 'reminders', 'myreminders'],
	description: lang => lang.tget('commandRemindDescription'),
	extendedHelp: lang => lang.tget('commandRemindExtended'),
	subcommands: true,
	usage: '<view|cancel|create:default> (reminder:reminder) (duration:timespan)'
})
@CreateResolvers([
	[
		'reminder',
		(str, possible, msg, [action]) => {
			if (action === 'view') return null;
			if (action === 'create') {
				if (str.length <= 140) return str;
				throw msg.language.tget('resolverReminderLength');
			}

			const reminders = msg.client.schedule.getUserReminders(msg.author.id);
			const reminderNum = parseInt(str, 10);
			if (isNaN(reminderNum) || reminders.length < reminderNum) throw msg.language.tget('resolverReminderInvalid', str);
			return reminderNum;
		}
	],
	[
		'timespan',
		(str, possible, msg, [action]) => action === 'view' || action === 'cancel'
			? null
			: msg.client.arguments.get('timespan').run(str, possible, msg)
	]
])
export default class extends SteveCommand {

	public async create(msg: KlasaMessage, [reminder, duration]: [string, number]): Promise<Message> {
		const reminderChannel = msg.guild ? msg.guild.settings.get(GuildSettings.Channels.ReminderChannel) : null;

		await this.client.schedule.createReminder(duration, msg.author.id, reminder, msg.channel instanceof TextChannel && reminderChannel ? reminderChannel : msg.channel.id);

		return msg.channel.send(msg.language.tget('commandRemindCreated', this.getTimeUntilRemind(duration)));
	}

	public async view(msg: KlasaMessage): Promise<Message> {
		const reminders = this.client.schedule.getUserReminders(msg.author.id);
		if (reminders.length < 1) throw msg.language.tget('commandRemindNoReminders');

		const response = await msg.send(new MessageEmbed()
			.setDescription('Loading...')
			.setColor(msg.author.settings.get(UserSettings.EmbedColor) as ColorResolvable || 0xadcb27));

		const embedData = msg.language.tget('commandRemindViewEmbed');

		if (msg.channel.type !== 'dm') {
			const display = new RichDisplay(this.buildViewEmbed(msg));

			for (const page of chunk(reminders, 5)) {
				const fields: EmbedField[] = [];

				for (let i = 0; i < page.length; i++) {
					const displayMessage = await this.getReminderDisplayContent(msg, page[i]);
					fields.push({
						name: `**${reminders.indexOf(page[i]) + 1}: ${displayMessage}**`,
						value: embedData.fieldValues(this.getTimeUntilRemind(page[i])),
						inline: false
					});
				}

				display.addPage((template: MessageEmbed) => template.addFields(fields));
			}

			await display.run(response);
			return response;
		}

		const embeds: MessageEmbed[] = [];

		for (const page of chunk(reminders, 25)) {
			const fields: EmbedField[] = [];

			for (let i = 0; i < page.length; i++) {
				const displayMessage = await this.getReminderDisplayContent(msg, page[i]);
				fields.push({
					name: `**${reminders.indexOf(page[i]) + 1}: ${displayMessage}**`,
					value: embedData.fieldValues(this.getTimeUntilRemind(page[i])),
					inline: false
				});
			}

			embeds.push(this.buildViewEmbed(msg).addFields(fields));
		}
		embeds.reverse();

		floatPromise(this, response.edit(embeds.pop()));
		embeds.forEach(embed => msg.channel.send(embed));
		return response;
	}

	public async cancel(msg: KlasaMessage, [reminderNum]: [number]): Promise<Message> {
		const reminders = this.client.schedule.getUserReminders(msg.author.id);
		const reminder = reminders[reminderNum - 1];

		await reminder.delete();

		return msg.channel.send(msg.language.tget('commandRemindCanceled', await this.getReminderDisplayContent(msg, reminder)));
	}

	private async getReminderDisplayContent(msg: KlasaMessage, reminder: Reminder): Promise<string> {
		const reminderUser = await this.client.users.fetch(msg.author.id);
		if (!reminderUser.dmChannel) return reminder.data.content;


		// @ts-expect-error 2339
		const channelID = reminder.data.channelID ?? reminder.data.channel;

		return channelID === reminderUser.dmChannel.id && msg.channel.id !== reminderUser.dmChannel.id
			? msg.language.tget('commandReminderDisplayHidden')
			: reminder.data.content;
	}

	private getTimeUntilRemind(reminder: Reminder | number): string {
		if (typeof (reminder) === 'number') return prettyMilliseconds(reminder, { verbose: true, secondsDecimalDigits: 0 });
		return prettyMilliseconds(reminder.time.getTime() - Date.now(), { verbose: true, secondsDecimalDigits: 0 });
	}

	private buildViewEmbed(msg: Message): MessageEmbed {
		const embedData = msg.language.tget('commandRemindViewEmbed');
		return new MessageEmbed()
			.setColor(msg.author.settings.get(UserSettings.EmbedColor) as ColorResolvable || 0xadcb27)
			.setTitle(embedData.title)
			.setThumbnail('https://github.com/tuataria/steve/blob/master/assets/images/alarmclock.png?raw=true');
	}

}
