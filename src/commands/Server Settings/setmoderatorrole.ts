import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message, Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['setmodrole'],
	description: lang => lang.tget('COMMAND_SETMODERATORROLE_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_SETMODERATORROLE_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<role:rolename>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [role]: [Role]): Promise<Message> {
		await msg.guild.settings.update(GuildSettings.Roles.Moderator, role.id, msg.guild.id);

		return msg.channel.send(msg.guild.language.tget('COMMAND_SETMODERATORROLE_SET', role.name));
	}

}
