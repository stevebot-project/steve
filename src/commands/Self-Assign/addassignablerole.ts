import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['addrank'],
	description: lang => lang.tget('commandAddAssignableRoleDescription'),
	extendedHelp: lang => lang.tget('commandAddAssignableRoleExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<role:rolename> [...]'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, roles: Role[]) {
		const asssignableRoleSnowflakes = msg.guild.settings.get(GuildSettings.Roles.Assignable) as string[];
		const addedRoleNames: string[] = [];

		for (const role of roles) {
			if (asssignableRoleSnowflakes.includes(role.id)) continue;

			await msg.guild.settings.update(GuildSettings.Roles.Assignable, role.id, msg.guild.id, { action: 'add' });

			addedRoleNames.push(role.name);
		}

		return msg.channel.send(msg.guild.language.tget('commandAddAssignableRole', addedRoleNames));
	}

}
