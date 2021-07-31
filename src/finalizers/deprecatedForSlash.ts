import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Finalizer, KlasaMessage } from 'klasa';

export default class extends Finalizer {

	 public run(msg: KlasaMessage, cmd: SteveCommand) {
		if (!cmd.deprecatedForSlash) return;

		return msg.channel.send(msg.language.tget('deprecatedForSlash', cmd.name, cmd.deprecatedForSlash));
	 }

}
