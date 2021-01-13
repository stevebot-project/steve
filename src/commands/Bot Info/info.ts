import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { ApplyOptions } from '@skyra/decorators';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	aliases: ['details', 'what'],
	guarded: true,
	description: lang => lang.tget('commandInfoDescription')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage) {
		return msg.channel.send(msg.language.tget('commandInfo'));
	}

}
