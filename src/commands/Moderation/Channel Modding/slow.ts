import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { oneLine } from 'common-tags';
import { Message, TextChannel } from 'discord.js';
import { friendlyDuration } from '@lib/util/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['slowmode'],
			description: lang => lang.get('COMMAND_SLOW_DESCRIPTION'),
			examples: ['slow 10', 'slowmode 0'],
			extendedHelp: lang => lang.get('COMMAND_SLOW_EXTENDEDHELP'),
			permissionLevel: PermissionLevels.MODERATOR,
			requiredPermissions: ['MANAGE_CHANNELS'],
			runIn: ['text'],
			usage: '<ratelimit:integer{,120}> [duration:timespan]',
			helpUsage: '[0-120] | (duration)'
		});

		this
			.customizeResponse('ratelimit',
				'You must provide an integer between 0 and 120. Providing 0 will turn off slowmode.');
	}

	public async run(msg: KlasaMessage, [ratelimit, duration]: [number, number]): Promise<Message> {
		await msg.guild.moderation.slow(msg.channel as TextChannel, ratelimit);

		let prettyDuration: string;
		if (duration && ratelimit > 0) {
			prettyDuration = friendlyDuration(duration);

			this.client.schedule.createSlowmodeTask(duration, msg.guild.id, msg.channel.id);
		}

		return msg.channel.send(oneLine`The message ratelimit in this channel has been ${ratelimit > 0 ? `set to ${ratelimit}
			seconds${duration ? ` for ${prettyDuration}` : ''}` : 'reset'}.`);
	}

}
