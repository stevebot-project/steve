import { CommandOptions } from 'klasa';
import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels, Time } from '@lib/types/Enums';
import { ApplyOptions } from '@skyra/decorators';
import { GuildMessage } from '@lib/types/Messages';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandPurgeDescription'),
	extendedHelp: lang => lang.tget('commandPurgeExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_MESSAGES'],
	runIn: ['text'],
	usage: '<number:number{,99}>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [number]: [number]): Promise<void> {
		const msgCollection = await msg.channel.bulkDelete(number + 1, true);

		const res = await msg.channel.send(msg.guild.language.tget('commandPurgePurged', msgCollection.size - 1));

		setTimeout(() => res.delete(), Time.SECOND * 10);
	}

}
