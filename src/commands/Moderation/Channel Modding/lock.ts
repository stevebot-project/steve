import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { Message, TextChannel } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.tget('COMMAND_LOCK_DESCRIPTION'),
			extendedHelp: lang => lang.tget('COMMAND_LOCK_EXTENDED'),
			permissionLevel: PermissionsLevels.MODERATOR,
			requiredPermissions: ['MANAGE_CHANNELS'],
			runIn: ['text']
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		await (msg.channel as TextChannel).updateOverwrite(msg.guild!.id, { SEND_MESSAGES: false }, msg.author.tag);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_LOCK_LOCKED'));
	}

}
