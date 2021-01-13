import { CommandOptions, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	cooldown: 60,
	cooldownLevel: 'channel',
	description: lang => lang.tget('commandAudinoDescription'),
	extendedHelp: lang => lang.tget('commandAudinoExtended')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.tget('commandAudinoId'),
			{ files: [{ attachment: './assets/images/john_screech.png', name: 'john_screech.png' }] });
	}

}
