import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	cooldown: 30,
	cooldownLevel: 'author',
	description: lang => lang.tget('COMMAND_DFTBA_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_DFTBA_EXTENDED')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.randomDftba);
	}

}
