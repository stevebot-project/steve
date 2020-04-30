import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, Role, Message } from 'discord.js';
import { friendlyDuration } from '@lib/util/util';
import { oneLine } from 'common-tags';
import { PermissionLevels } from '@lib/types/enums';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			description: lang => lang.get('COMMAND_ROLE_DESCRIPTION'),
			examples: ['role enchtest|gmt-4', 'role enchtest|emcee|1 hour'],
			permissionLevel: PermissionLevels.MODERATOR,
			requiredPermissions: ['MANAGE_ROLES'],
			usage: '<targetMember:membername> <targetRole:rolename> [duration:timespan]',
			helpUsage: 'member | role | (duration)'
		});
	}

	public async run(msg: KlasaMessage, [targetMember, targetRole, duration]: [GuildMember, Role, number]): Promise<Message> {
		if (msg.member.roles.highest.comparePositionTo(targetRole) < 0) throw msg.language.get('COMMAND_ROLE_HIGHER_RANK', targetRole.name);

		const toggle = targetMember.roles.cache.has(targetRole.id);

		try {
			if (toggle) {
				await targetMember.roles.remove(targetRole);
			} else {
				await targetMember.roles.add(targetRole);
			}
		} catch (error) {
			msg.channel.send(`Unable to edit ${targetMember.user.tag}'s roles.`);
			throw this.client.console.log(`Unable to edit member roles in ${msg.guild.name}: ${error}`);
		}

		let prettyDuration: string;
		if (duration) {
			prettyDuration = friendlyDuration(duration);

			this.client.schedule.createRoleTask(duration, targetMember.user.id, targetMember.guild.id, targetRole.id);
		}

		return msg.channel.send(oneLine`The ${targetRole.name} role has been ${toggle ? 'removed from' : 'added to'}
			${targetMember.user.tag}${duration ? ` for ${prettyDuration}` : ''}.`);
	}

}
