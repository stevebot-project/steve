import { CommandOptions, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	aliases: ['magic8ball'],
	cooldown: 5,
	cooldownLevel: 'author',
	description: lang => lang.tget('command_8BallDescription'),
	extendedHelp: lang => lang.tget('command_8BallExtended'),
	usage: '<question:string>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		const responses = msg.language.tget('command_8BallResponses') as string[];
		return msg.channel.send(responses[Math.floor(Math.random() * responses.length)]);
	}

}
