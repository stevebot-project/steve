import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { oneLine } from 'common-tags';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 60,
			cooldownLevel: 'channel',
			description: 'When your audio just won\'t work and you must screm!!!',
			extendedHelp: oneLine`The image this command displays came from a reading livestream John did; it\'s the face he made when his
			audio cut out *again*.`
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(oneLine`[Image Description: An image of John Green in front of a bookshelf, raising his hands to his head and
			making a face of fury because his audio just. Won't. Work.]`,
		{ files: [{ attachment: './assets/images/john_screech.png', name: 'john_screech.png' }] });
	}

}
