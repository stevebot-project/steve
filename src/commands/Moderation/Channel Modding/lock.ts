import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { Message, TextChannel } from 'discord.js';
import { friendlyDuration } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_LOCK_DESCRIPTION'),
			examples: ['lock', 'lock 1 hour'],
			permissionLevel: PermissionLevels.MODERATOR,
			requiredPermissions: ['MANAGE_CHANNELS'],
			runIn: ['text'],
			usage: '[duration:timespan]',
			helpUsage: '(duration)'
		});
	}

	public async run(msg: KlasaMessage, [duration]: [number]): Promise<Message> {
		await msg.guild.moderation.lock(msg.channel as TextChannel);

		let prettyDuration: string;
		if (duration) {
			prettyDuration = friendlyDuration(duration);

			this.client.schedule.createUnlockTask(duration, msg.channel.id, msg.guild.id);
		}

		return msg.channel.send(`This channel has been locked${duration ? ` for ${prettyDuration}` : ''}.`);
	}

}
