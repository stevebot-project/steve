import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { CommandOptions, KlasaMessage } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandRebootDescription'),
	guarded: true,
	permissionLevel: PermissionsLevels.OWNER
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage) {
		await msg.sendLocale('commandReboot').catch(err => this.client.emit('error', err));
		await Promise.all(this.client.providers.map(provider => provider.shutdown()));
		process.exit();
	}

}
