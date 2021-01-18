import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['tdpm'],
	description: lang => lang.tget('commandToggleDeletePinMessagesDescription'),
	extendedHelp: lang => lang.tget('commandToggleDeletePinMessagesExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage) {
		const currentSetting = msg.guild.settings.get(GuildSettings.DeletePinMessages) as boolean;

		await msg.guild.settings.update(GuildSettings.DeletePinMessages, !currentSetting);

		return msg.channel.send(msg.guild.language.tget('commandToggleDeletePinMessages', currentSetting));
	}

}
