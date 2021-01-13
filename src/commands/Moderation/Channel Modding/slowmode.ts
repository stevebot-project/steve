import { CommandOptions } from 'klasa';
import { Message } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { friendlyDuration } from '@utils/util';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<CommandOptions>({
	aliases: ['slow'],
	description: lang => lang.tget('commandSlowmodeDescription'),
	extendedHelp: lang => lang.tget('commandSlowmodeExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_CHANNELS'],
	runIn: ['text'],
	usage: '<duration:timespan|reset>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [duration]: [number | string]): Promise<Message> {
		/* divide by 1000 bc setRateLimitPerUser works with seconds */
		if (msg.channel.isGuildTextChannel()) {
			await msg.channel.setRateLimitPerUser(typeof duration === 'number' ? duration / 1000 : 0, msg.author.tag);
		}

		return msg.channel.send(duration === 'reset'
			? msg.guild.language.tget('commandSlowmodeReset')
			: msg.guild.language.tget('commandSlowmodeSet', friendlyDuration(duration as number)));
	}

}
