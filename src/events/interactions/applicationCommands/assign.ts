import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { Interaction, InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: true
})
export default class extends ApplicationCommand {

	public async handle(interaction: Interaction): Promise<InteractionApplicationCommandCallbackResponseData> {
		const subcommand = interaction.data!.options![0].name;
		const guild = this.client.guilds.cache.get(interaction.guild_id!)!;
		const member = guild.members.cache.get(interaction.member!.user.id) ?? await guild.members.fetch(interaction.member!.user.id);

		if (!member.canUseSelfAssign) {
			const trustedRoleID = guild.settings.get(GuildSettings.Roles.Trusted);
			return { content: guild.language.tget('commandAssignRoleNeedTrusted', guild.roles.cache.get(trustedRoleID)!.name) };
		}

		if (subcommand === 'list') return { content: guild.language.tget('interactionAssignList', guild.settings.get(GuildSettings.Prefix)) };

		if (!guild.me!.permissions.has('MANAGE_ROLES')) return { content: guild.language.tget('interactionAssignMissingPermission') };

		const role = interaction.data!.resolved!.roles![interaction.data!.options![0].options![0].value as string];
		const assignableRoles = guild.settings.get(GuildSettings.Roles.Assignable) as string[];
		if (!assignableRoles.includes(role.id)) return { content: guild.language.tget('interactionAssignRoleNotAssignable', role.name) };

		if (subcommand === 'add') {
			await member.roles.add(role.id);

			return { content: guild.language.tget('commandAssignRoleAdd', role.name) };
		}

		await member.roles.remove(role.id);

		return { content: guild.language.tget('commandAssignRoleRemove', role.name) };
	}

}
