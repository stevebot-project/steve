import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['pomo', 'pom'],
	description: lang => lang.tget('COMMAND_POMODORO_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_POMODORO_EXTENDED')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.tget('COMMAND_POMODORO_UNDERCONSTRUCTION'));
	}

}
