import { GuildMessage } from '@lib/types/Messages';
import { Command, Inhibitor } from 'klasa';

export default class extends Inhibitor {

	public run(msg: GuildMessage, cmd: Command) {
		return cmd.hidden && msg.command !== cmd && !this.client.owners.has(msg.author);
	}

}
