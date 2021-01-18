import { Monitor, MonitorOptions, KlasaMessage } from 'klasa';
import { ApplyOptions } from '@skyra/decorators';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

@ApplyOptions<MonitorOptions>({
	allowedTypes: ['PINS_ADD'],
	ignoreOthers: false
})
export default class extends Monitor {

	public async run(msg: KlasaMessage) {
		if (msg.guild) {
			const deletePinMessages = msg.guild!.settings.get(GuildSettings.DeletePinMessages) as boolean;
			if (deletePinMessages) return msg.delete();
		}
	}

}
