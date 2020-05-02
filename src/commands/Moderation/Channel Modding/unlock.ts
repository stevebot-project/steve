import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { PermissionLevels } from '@lib/types/enums';
import { Message, TextChannel } from 'discord.js';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_UNLOCK_DESCRIPTION'),
			examples: ['unlock'],
			permissionLevel: PermissionLevels.MODERATOR,
			requiredPermissions: ['MANAGE_CHANNELS'],
			runIn: ['text']
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		await (msg.channel as TextChannel).updateOverwrite(msg.guild.id, { // eslint-disable-line no-extra-parens
			SEND_MESSAGES: true
		});


		return msg.channel.send(msg.language.get('COMMAND_UNLOCK_UNLOCKED'));
	}

}
