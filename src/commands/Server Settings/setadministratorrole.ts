import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message, Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['setadminrole'],
	description: lang => lang.tget('commandSetAdministratorRoleDescription'),
	extendedHelp: lang => lang.tget('commandSetAdministratorRoleExtended'),
	permissionLevel: PermissionsLevels.ADMINISTRATOR,
	runIn: ['text'],
	usage: '<role:rolename>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [role]: [Role]): Promise<Message> {
		await msg.guild.settings.update(GuildSettings.Roles.Administrator, role.id, msg.guild.id);

		return msg.channel.send(msg.guild.language.tget('commandSetAdministratorRoleSet', role.name));
	}

}
