import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Inhibitor, KlasaMessage } from 'klasa';

export default class extends Inhibitor {

	public run(msg: KlasaMessage, cmd: SteveCommand) {
		if (!cmd.runIn.length) throw msg.language.tget('inhibitorRunInNone', cmd.name);
		if (!cmd.runIn.includes(msg.channel.type)) throw msg.language.tget('inhibitorRunIn', cmd.runIn.join(', '));
	}

}
