import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			guarded: true,
			description: lang => lang.tget('COMMAND_PING_DESCRIPTION')
		});
	}

	public async run(msg: KlasaMessage) {
		const pingMsg = await msg.channel.send(msg.language.tget('COMMAND_PING'));
		return pingMsg.edit(msg.language.tget('COMMAND_PINGPONG', (pingMsg.editedTimestamp || pingMsg.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp), Math.round(this.client.ws.ping)));
	}

}
