import { CommandOptions, KlasaMessage } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Message } from 'discord.js';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	cooldown: 60,
	cooldownLevel: 'channel',
	description: lang => lang.tget('COMMAND_AUDINO_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_AUDINO_EXTENDED')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.tget('COMMAND_AUDINO_ID'),
			{ files: [{ attachment: './assets/images/john_screech.png', name: 'john_screech.png' }] });
	}

}
