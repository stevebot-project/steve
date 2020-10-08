import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_TOGGLETRUSTEDROLEREQUIREMENT_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			requiredSettings: ['roles.trusted'],
			runIn: ['text']
		});
	}

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
