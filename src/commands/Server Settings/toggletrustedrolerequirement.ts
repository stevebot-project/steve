import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandToggleTrustedRoleRequirementDescription'),
	extendedHelp: lang => lang.tget('commandToggleTrustedRoleRequirementExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredSettings: ['roles.trusted'],
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage): Promise<Message> {
		const required: boolean = msg.guild.settings.get(GuildSettings.Roles.RequireTrustedRoleForSelfAssign);

		if (required) {
			await msg.guild.settings.update(GuildSettings.Roles.RequireTrustedRoleForSelfAssign, false);

			return msg.channel.send(msg.guild.language.tget('commandToggleTrustedRoleRequirementDisable'));
		}

		await msg.guild.settings.update(GuildSettings.Roles.RequireTrustedRoleForSelfAssign, true);

		return msg.channel.send(msg.guild.language.tget('commandToggleTrustedRoleRequirementEnable'));
	}

}
