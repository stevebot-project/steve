import { CommandOptions, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	cooldown: 60,
	cooldownLevel: 'channel',
	description: lang => lang.tget('commandFDescription'),
	extendedHelp: lang => lang.tget('commandFExtended')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.tget('commandFId'),
			{ files: [{ attachment: './assets/images/f.png', name: 'pay_respects.png' }] });
	}

}
