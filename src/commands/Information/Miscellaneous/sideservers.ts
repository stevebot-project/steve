import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Sideservers, Colors } from '@lib/types/enums';
import { oneLine } from 'common-tags';
import { Message } from 'discord.js';
import { newEmbed } from '@utils/util';
import { TUATARIA } from '@root/config';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Get invite links to Tuataria\'s sideservers.',
			examples: ['sideservers']
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const embed = newEmbed()
			.setTitle('Official Sideservers')
			.setDescription(oneLine`Tuataria has 3 official sideservers: Gamataria (for all your video game discussion needs),
				Hogwartaria (for Harry Potter-related things), and Bibliotaria (our official book club). You can find links to them
				below. Click or tap the emojis!`)
			.setColor(Colors.BrightBlue)
			.addFields([
				{ name: 'Bibliotaria', value: `[📚](${Sideservers.BIBLIOTARIA})`, inline: true },
				{ name: 'Gamataria', value: `[🎮](${Sideservers.GAMATARIA})`, inline: true },
				{ name: 'Hogwartaria', value: `[🌂](${Sideservers.HOGWARTARIA})`, inline: true }
			]);

		return msg.channel.send(embed);
	}

	public async init(): Promise<this | void> {
		if (!TUATARIA) return this.disable();
	}

}
