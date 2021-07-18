import { CommandOptions, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';
import { randomInteger } from '@utils/util';

@ApplyOptions<CommandOptions>({
	cooldown: 5,
	cooldownLevel: 'author',
	description: lang => lang.tget('commandRateDescription'),
	extendedHelp: lang => lang.tget('commandRateExtended'),
	usage: '<thing:string>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [thing]: [string]): Promise<Message> {
		return msg.channel.send(msg.language.tget('commandRateResponse', thing, randomInteger(5)));
	}

}
