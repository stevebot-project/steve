import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { Message } from 'discord.js';
import { NAME } from '@root/config';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['vote'],
			description: `Have ${NAME} create a poll for you`,
			extendedHelp: 'This command requires you to have at least two options and no more than ten.',
			examples: ['poll Is butt legs?|Butt is legs|Butt is butt'],
			usage: '<question:string> <option1:string> <option2:string> [...]',
			helpUsage: 'question | option 1 | option 2 | ...'
		});
	}

	public async run(msg: KlasaMessage, choices: string[]): Promise<Message> {
		if (choices.length > 11) {
			return msg.channel.send(`You have too many choices! The max is 10!`);
		}
		const emotes = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

		let out = `**${choices[0]}**\n`;
		for (let i = 1; i < choices.length; i++) {
			out += `${emotes[i - 1]} ${choices[i]}\n`;
		}
		msg.channel.send(out).then((message) => {
			for (let j = 0; j < choices.length - 1; j++) {
				message.react(emotes[j]);
			}
		});

		return;
	}

}
