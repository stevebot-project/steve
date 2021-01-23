import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions, CreateResolvers } from '@skyra/decorators';
import { Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandIgnoreRoleDescription'),
	extendedHelp: lang => lang.tget('commandIgnoreRoleExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<role:rolename>'
})
@CreateResolvers([
	[
		'rolename',
		async (str, possible, msg) => {
			const role = await msg.client.arguments.get('rolename').run(str, possible, msg);

			const ignoredRoles = msg.guild!.settings.get(GuildSettings.IgnoredRoles) as string[];
			if (ignoredRoles.includes(role.id)) throw msg.guild!.language.tget('commandIgnoreRoleAlreadyIgnored', role.name);

			return role;
		}
	]
])
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [role]: [Role]) {
		await msg.guild.settings.update(GuildSettings.IgnoredRoles, role.id, msg.guild.id, { action: 'add' });

		return msg.channel.send(msg.guild.language.tget('commandIgnoreRole', role.name));
	}

}
