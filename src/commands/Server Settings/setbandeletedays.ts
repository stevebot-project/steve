import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_SETBANDELETEDAYS_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_SETBANDELETEDAYS_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text'],
			usage: '<days:integer{0,14}>'
		});
	}

	public async run(msg: KlasaMessage, [days]: [number]): Promise<Message> {
		await msg.guild!.settings.update(GuildSettings.Moderation.BanDeleteDays, days);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SETBANDELETEDAYS_SET', days));
	}

}
