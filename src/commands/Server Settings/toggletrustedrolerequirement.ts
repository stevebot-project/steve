import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredSettings: ['roles.trusted'],
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		const required: boolean = msg.guild!.settings.get(GuildSettings.Roles.RequireTrustedRoleForSelfAssign);

		if (required) {
			await msg.guild!.settings.update(GuildSettings.Roles.RequireTrustedRoleForSelfAssign, false);

			return msg.channel.send(msg.guild!.language.tget('COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_DISABLE'));
		}

		await msg.guild!.settings.update(GuildSettings.Roles.RequireTrustedRoleForSelfAssign, true);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_ENABLE'));
	}

}
