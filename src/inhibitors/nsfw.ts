import { GuildMessage } from '@lib/types/Messages';
import { Command, Inhibitor } from 'klasa';

export default class extends Inhibitor {

	public run(msg: GuildMessage, cmd: Command) {
		if (cmd.nsfw && !msg.channel.nsfw) throw msg.language.tget('inhibitorNsfw');
	}

}
