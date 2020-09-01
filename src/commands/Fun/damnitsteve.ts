import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { oneLine } from 'common-tags';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			cooldown: 60,
			cooldownLevel: 'channel',
			description: 'Goddamnit Steve.'
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(oneLine`[Image Description: A screenshot of a tweet from Hank Green on 10 August 2020, saying "God Damnit, Steve."]`,
			{ files: [{ attachment: './assets/images/damnit_steve.png', name: 'damnit_steve.png' }] });
	}

}
