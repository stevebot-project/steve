import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { SUPPORT_LINK } from '@root/config';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandSupportDescription'),
	guarded: true
})
export default class extends SteveCommand {

	public async init() {
		if (!SUPPORT_LINK) this.disable();
	}

	public async run(msg: KlasaMessage) {
		return msg.channel.send(SUPPORT_LINK);
	}

}
