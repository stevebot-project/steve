import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { Message, TextChannel } from 'discord.js';
import { friendlyDuration } from '@utils/util';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Locks a channel from public posting.',
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

			this.client.schedule.create('unlock', Date.now() + duration, {
				data: {
					channel: msg.channel.id,
					guild: msg.guild.id
				},
				catchUp: true
			});
		}

		return msg.channel.send(`This channel has been locked${duration ? ` for ${prettyDuration}` : ''}.`);
	}

}
