import { CommandOptions, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	cooldown: 5,
	cooldownLevel: 'author',
	description: lang => lang.tget('COMMAND_RATE_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_RATE_EXTENDED'),
	usage: '<thing:string>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [thing]: [string]): Promise<Message> {
		return msg.channel.send(msg.language.tget('COMMAND_RATE_RESPONSE', thing, Math.floor((Math.random() * 10) + 1)));
	}

}
