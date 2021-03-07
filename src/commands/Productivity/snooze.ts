import { CommandOptions, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { ApplyOptions, CreateResolver } from '@skyra/decorators';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { friendlyDuration } from '@utils/util';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandSnoozeDescription'),
	extendedHelp: lang => lang.tget('commandSnoozeExtended'),
	usage: '(duration:timespan)'
})
@CreateResolver(
	'timespan',
	(str, possible, msg) => str
		? msg.client.arguments.get('timespan').run(str, possible, msg)
		: msg.author.settings.get(UserSettings.SnoozeDuration)
)
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [duration]: [number]): Promise<Message> {
		const reminder = this.client.schedule.getUserSnooze(msg.author.id);
		if (!reminder) return msg.channel.send(msg.language.tget('commandSnoozeNoRemind'));

		await this.client.schedule.createReminder(duration,
			// @ts-expect-error 2339
			reminder.data.userID ?? reminder.data.user, reminder.data.content,
			// @ts-expect-error 2339
			reminder.data.channelID ?? reminder.data.channel);

		await reminder.delete();

		return msg.channel.send(msg.language.tget('commandSnoozeCreated', reminder.data.content, friendlyDuration(duration)));
	}

}
