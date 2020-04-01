import { CommandStore, KlasaMessage } from 'klasa';
import { ClientUser } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionLevels } from '@lib/types/enums';
import { TUATARIA } from '@root/config';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: 'Change Steve\'s profile picture.',
			permissionLevel: PermissionLevels.OWNER,
			examples: ['pfp fire'],
			usage: '<cutegray|cutegreen|facelightblue|facedarkblue|fire|peace>',
			helpUsage: '*cutegray* OR *cutegreen* OR *facelightblue* OR *facedarkblue* OR *fire* OR *peace*'
		});
	}

	public async run(msg: KlasaMessage, [pfp]: [string]): Promise<ClientUser> {
		switch (pfp) {
			case 'cutegray':
				return this.client.user.setAvatar('./assets/images/pfp/steve_cute_gray.png');
			case 'cutegreen':
				return this.client.user.setAvatar('./assets/images/pfp/steve_cute_green.png');
			case 'facelighblue':
				return this.client.user.setAvatar('./assets/images/pfp/steve_face_lightblue.png');
			case 'facedarkblue':
				return this.client.user.setAvatar('./assets/images/pfp/steve_face_darkblue.png');
			case 'fire':
				return this.client.user.setAvatar('./assets/images/pfp/steve_fire.png');
			case 'peace':
				return this.client.user.setAvatar('./assets/images/pfp/steve_peace.png');
			default:
				return this.client.user.setAvatar('./assets/images/pfp/steve_cute_gray.png');
		}
	}

	public async init(): Promise<this | void> {
		if (!TUATARIA) return this.disable();
	}

}
