import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message, Role } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_SETMUTEDROLE_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_SETMUTEDROLE_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text'],
			usage: '<role:rolename>'
		});
	}

	public async run(msg: KlasaMessage, [role]: [Role]): Promise<Message> {
		await msg.guild!.settings.update(GuildSettings.Roles.Muted, role.id, msg.guild!.id);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SETMUTEDROLE_SET', role.name));
	}

}
