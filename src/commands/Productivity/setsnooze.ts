import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { GuildMessage } from '@lib/types/Messages';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { ApplyOptions } from '@skyra/decorators';
import { friendlyDuration } from '@utils/util';
import { Message } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandSetSnoozeDescription'),
	usage: '<duration:timespan>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [duration]: [number]): Promise<Message> {
		await msg.author.settings.update(UserSettings.SnoozeDuration, duration);

		return msg.channel.send(msg.guild.language.tget('commandSetSnoozeSet', friendlyDuration(duration)));
	}

}
