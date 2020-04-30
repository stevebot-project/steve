import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Sideservers, Colors } from '@lib/types/enums';
import { Message } from 'discord.js';
import { newEmbed } from '@utils/util';
import { TUATARIA } from '@root/config';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_SIDESERVERS_DESCRIPTION'),
			examples: ['sideservers']
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const embed = newEmbed()
			.setTitle(msg.language.get('COMMAND_SIDESERVERS_EMBED_TITLE'))
			.setDescription(msg.language.get('COMMAND_SIDESERVERS_EMBED_DESCRIPTION'))
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
