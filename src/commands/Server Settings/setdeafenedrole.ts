import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message, Role } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('COMMAND_SETDEAFENEDROLE_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_SETDEAFENEDROLE_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<role:rolename>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [role]: [Role]): Promise<Message> {
		await msg.guild!.settings.update(GuildSettings.Roles.Deafened, role.id, msg.guild!.id);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_SETDEAFENEDROLE_SET', role.name));
	}

}
