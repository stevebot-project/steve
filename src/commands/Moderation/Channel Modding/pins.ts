import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { Message, TextChannel } from 'discord.js';
import { oneLine } from 'common-tags';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Tells how many messages are currently pinned in a channel.',
			examples: ['pins', 'pins unpin'],
			extendedHelp: 'Do `s;pins unpin` to unpin all messages.',
			permissionLevel: PermissionLevels.MODERATOR,
			runIn: ['text'],
			usage: '[unpin]',
			helpUsage: '(unpin)'
		});
	}

	public async run(msg: KlasaMessage, [unpin]: [string]): Promise<Message> {
		const channel = msg.channel as TextChannel;

		const pins = await channel.messages.fetchPinned();

		if (unpin) {
			for (const [id, pinMsg] of pins) { // eslint-disable-line @typescript-eslint/no-unused-vars
				await pinMsg.unpin();
			}

			return channel.send(`${pins.size} messages unpinned in ${channel.name}.`);
		}

		return channel.send(oneLine`There ${pins.size === 1 ? 'is' : 'are'} ${pins.size} message${pins.size === 1 ? '' : 's'}
			pinned in ${channel.name}.`);
	}

}
