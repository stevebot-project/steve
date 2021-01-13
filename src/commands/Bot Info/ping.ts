import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandOptions, KlasaMessage } from 'klasa';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	guarded: true,
	description: lang => lang.tget('commandPingDescription')
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage) {
		const pingMsg = await msg.channel.send(msg.language.tget('commandPing'));
		return pingMsg.edit(msg.language.tget('commandPingpong', (pingMsg.editedTimestamp || pingMsg.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp), Math.round(this.client.ws.ping)));
	}

}
