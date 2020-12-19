import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('COMMAND_LOCK_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_LOCK_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_CHANNELS'],
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		if (msg.channel.isGuildTextChannel()) await msg.channel.updateOverwrite(msg.guild!.id, { SEND_MESSAGES: false }, msg.author.tag);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_LOCK_LOCKED'));
	}

}
