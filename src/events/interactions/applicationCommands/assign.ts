import { ApplicationCommand } from '@lib/structures/events/ApplicationCommand';
import { InteractionCreatePacket, InteractionResponseData } from '@lib/types/Interactions';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends ApplicationCommand {

	public async handle(data: InteractionCreatePacket): Promise<InteractionResponseData> {

		if (data.guild_id) {
			const subcommand = data.data.options[0].name;
			const guild = this.client.guilds.cache.get(data.guild_id)!;
			const member = guild.members.cache.get(data.member.user.id) ?? await guild.members.fetch(data.member.user.id);

			if (!member.canUseSelfAssign) {
				const trustedRoleID = guild.settings.get(GuildSettings.Roles.Trusted);
				return { content: guild.language.tget('commandAssignRoleNeedTrusted', guild.roles.cache.get(trustedRoleID)!.name) };
			}

			if (subcommand === 'list') return { content: guild.language.tget('interactionAssignList', guild.settings.get(GuildSettings.Prefix)) };

			if (!guild.me!.permissions.has('MANAGE_ROLES')) return { content: guild.language.tget('interactionAssignMissingPermission') };

			const role = data.data.resolved.roles![data.data.options[0].options[0].value as string];
			const assignableRoles = guild.settings.get(GuildSettings.Roles.Assignable) as string[];
			if (!assignableRoles.includes(role.id)) return { content: guild.language.tget('interactionAssignRoleNotAssignable', role.name) };

			if (subcommand === 'add') {
				await member.roles.add(role.id);

				return { content: guild.language.tget('commandAssignRoleAdd', role.name) };
			}

			if (subcommand === 'remove') {
				await member.roles.remove(role.id);

				return { content: guild.language.tget('commandAssignRoleRemove', role.name) };
			}
		}

		return { content: this.client.languages.default.tget('interactionMustBeInGuild') };
	}

}
