import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message, TextChannel } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_SETMEMBERLOG_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_SETMEMBERLOG_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text'],
			usage: '<channel:channel>'
		});
	}

	public async run(msg: KlasaMessage, [channel]: [TextChannel]): Promise<Message> {
		await msg.guild!.settings.update(GuildSettings.Channels.Memberlog, channel.id);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SETMEMBERLOG_SET', channel.id));
	}

}
