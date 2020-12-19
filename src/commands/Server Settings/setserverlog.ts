import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message, TextChannel } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('COMMAND_SETSERVERLOG_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_SETSERVERLOG_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<channel:channel>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [channel]: [TextChannel]): Promise<Message> {
		await msg.guild!.settings.update(GuildSettings.Channels.Serverlog, channel.id);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SETSERVERLOG_SET', channel.id));
	}

}
