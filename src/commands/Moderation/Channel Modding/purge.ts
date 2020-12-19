import { CommandOptions, KlasaMessage } from 'klasa';
import { TextChannel } from 'discord.js';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels, Time } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('COMMAND_PURGE_DESCRIPTION'),
	extendedHelp: lang => lang.tget('COMMAND_PURGE_EXTENDED'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_MESSAGES'],
	runIn: ['text'],
	usage: '<number:number{,99}>'
})
export default class extends SteveCommand {

	public async run(msg: KlasaMessage, [number]: [number]): Promise<void> {
		const msgCollection = await (msg.channel as TextChannel).bulkDelete(number + 1, true);

		const res = await msg.channel.send(msg.guild!.language.tget('COMMAND_PURGE_PURGED', msgCollection.size - 1));

		setTimeout(() => res.delete(), Time.SECOND * 10);
	}

}
