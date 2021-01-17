import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { Inhibitor, KlasaMessage } from 'klasa';

export default class extends Inhibitor {

	public run(msg: KlasaMessage, cmd: SteveCommand) {
		if (!cmd.requiredSettings.length || msg.channel.type !== 'text') return;
		// eslint-disable-next-line eqeqeq, no-eq-null
		const requiredSettings = cmd.requiredSettings.filter(setting => msg.guild!.settings.get(setting) == null);
		if (requiredSettings.length) throw msg.language.tget('inhibitorRequiredSettings', requiredSettings);
	}

}
