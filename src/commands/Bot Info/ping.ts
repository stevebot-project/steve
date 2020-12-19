import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	guarded: true,
	description: lang => lang.tget('COMMAND_PING_DESCRIPTION')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage) {
		const pingMsg = await msg.channel.send(msg.language.tget('COMMAND_PING'));
		return pingMsg.edit(msg.language.tget('COMMAND_PINGPONG', (pingMsg.editedTimestamp || pingMsg.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp), Math.round(this.client.ws.ping)));
	}

}
