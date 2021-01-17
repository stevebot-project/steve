import { GuildMessage } from '@lib/types/Messages';
import { Command, Inhibitor } from 'klasa';

export default class extends Inhibitor {

	public async run(msg: GuildMessage, cmd: Command) {
		const { broke, permission } = await this.client.permissionLevels.run(msg, cmd.permissionLevel);
		if (!permission) throw broke ? msg.language.tget('inhibitorPermissions', cmd.name) : true;
	}

}
