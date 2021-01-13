import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandInviteDescription'),
	guarded: true
})
export default class extends SteveCommand {

	public async init() {
		if (this.client.application && !this.client.application.botPublic) this.permissionLevel = PermissionsLevels.OWNER;
	}

	public async run(msg: KlasaMessage) {
		return msg.sendLocale('commandInvite');
	}

}
