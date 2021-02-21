import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['removerank', 'remrank'],
	description: lang => lang.tget('commandRemoveAssignableRoleDescription'),
	extendedHelp: lang => lang.tget('commandRemoveAssignableRoleExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<role:rolename> [...]'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, roles: Role[]) {
		const asssignableRoleSnowflakes = msg.guild.settings.get(GuildSettings.Roles.Assignable) as string[];
		const removedRoleNames: string[] = [];

		for (const role of roles) {
			if (!asssignableRoleSnowflakes.includes(role.id)) continue;

			await msg.guild.settings.update(GuildSettings.Roles.Assignable, role.id, msg.guild.id, { action: 'remove' });

			removedRoleNames.push(role.name);
		}

		return msg.channel.send(msg.guild.language.tget('commandRemoveAssignableRole', removedRoleNames));
	}

}
