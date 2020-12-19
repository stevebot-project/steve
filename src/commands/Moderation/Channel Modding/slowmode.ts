import { CommandOptions, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { friendlyDuration } from '@utils/util';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	aliases: ['slow'],
	description: lang => lang.tget('COMMAND_SLOWMODE_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_SLOWMODE_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_CHANNELS'],
	runIn: ['text'],
	usage: '<duration:timespan|reset>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [duration]: [number | string]): Promise<Message> {
		/* divide by 1000 bc setRateLimitPerUser works with seconds */
		if (msg.channel.isGuildTextChannel()) await msg.channel.setRateLimitPerUser(typeof duration === 'number' ? duration / 1000 : 0, msg.author.tag);

		return msg.channel.send(duration === 'reset'
			? msg.guild!.language.tget('COMMAND_SLOWMODE_RESET')
			: msg.guild!.language.tget('COMMAND_SLOWMODE_SET', friendlyDuration(duration as number)));
	}

}
