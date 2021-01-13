import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message, TextChannel } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandSetReminderChannelDescription'),
	extendedHelp: lang => lang.tget('commandSetReminderChannelExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<channel:channel>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [channel]: [TextChannel]): Promise<Message> {
		await msg.guild.settings.update(GuildSettings.Channels.ReminderChannel, channel.id);

		return msg.channel.send(msg.guild.language.tget('commandSetReminderChannelSet', channel.id));
	}

}
