import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Post a random Gritty GIF.',
			examples: ['gritty'],
			extendedHelp: 'Gritty is our lord and savior. (He\'s actually the mascot for Philadelphia\'s hockey team but shhh.)'
		});
	}

	public run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send({ files: [{ attachment: `./assets/images/gritty/gritty_${Math.floor(Math.random() * 5) + 1}.gif` }] });
	}

}
