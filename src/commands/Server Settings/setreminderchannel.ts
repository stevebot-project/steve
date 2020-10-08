import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message, TextChannel } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_SETREMINDERCHANNEL_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_SETREMINDERCHANNEL_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text'],
			usage: '<channel:channel>'
		});
	}

	public async run(msg: KlasaMessage, [channel]: [TextChannel]): Promise<Message> {
		await msg.guild!.settings.update(GuildSettings.Channels.ReminderChannel, channel.id);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SETREMINDERCHANNEL_SET', channel.id));
	}

}
