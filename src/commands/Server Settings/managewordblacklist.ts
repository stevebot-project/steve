import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('COMMAND_MANAGEWORDBLACKLIST_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_MANAGEWORDBLACKLIST_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	runIn: ['text'],
	usage: '<enable|disable|reset|word:string>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [word]: [string]): Promise<Message> {
		if (word === 'enable') {
			await msg.guild!.settings.update(GuildSettings.WordBlacklist.Enabled, true);

			return msg.channel.send(msg.guild!.language.tget('COMMAND_MANAGEWORDBLACKLIST_ENABLED'));
		} else if (word === 'disable') {
			await msg.guild!.settings.update(GuildSettings.WordBlacklist.Enabled, false);

			return msg.channel.send(msg.guild!.language.tget('COMMAND_MANAGEWORDBLACKLIST_DISABLED'));
		} else if (word === 'reset') {
			await msg.guild!.settings.reset(GuildSettings.WordBlacklist.List);

			return msg.channel.send(msg.guild!.language.tget('COMMAND_MANAGEWORDBLACKLIST_RESET'));
		}

		const removing = (msg.guild!.settings.get(GuildSettings.WordBlacklist.List) as string[]).includes(word);

		await msg.guild!.settings.update(GuildSettings.WordBlacklist.List, word);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_MANAGEWORDBLACKLIST_UPDATE', removing));
	}

}
