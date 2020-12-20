import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('COMMAND_UNLOCK_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_UNLOCK_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_CHANNELS'],
	runIn: ['text']
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage): Promise<Message> {
		await msg.channel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: true }, msg.author.tag);

		return msg.channel.send(msg.guild.language.tget('COMMAND_UNLOCK_UNLOCKED'));
	}

}
