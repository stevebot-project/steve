import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { Message } from 'discord.js';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['pomo', 'pom'],
	description: lang => lang.tget('commandPomodoroDescription'),
	extendedHelp: lang => lang.tget('commandPomodoroExtended')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage): Promise<Message> {
		return msg.channel.send(msg.language.tget('commandPomodoroUnderConstruction'));
	}

}
