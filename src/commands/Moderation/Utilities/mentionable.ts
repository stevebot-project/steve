import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildMessage } from '@lib/types/Messages';
import { ApplyOptions } from '@skyra/decorators';
import { Role } from 'discord.js';
import { CommandOptions } from 'klasa';

@ApplyOptions<CommandOptions>({
	description: lang => lang.tget('commandMentionableDescription'),
	extendedHelp: lang => lang.tget('commandMentionableExtended'),
	permissionLevel: PermissionsLevels.MODERATOR,
	requiredPermissions: ['MANAGE_ROLES'],
	runIn: ['text'],
	usage: '<role:rolename>'
})
export default class extends SteveCommand {

	public async run(msg: GuildMessage, [role]: [Role]) {
		const currentlyMentionable = role.mentionable;

		await role.setMentionable(!currentlyMentionable);

		return msg.channel.send(msg.guild.language.tget('commandMentionable', role.name, !currentlyMentionable));
	}

}
