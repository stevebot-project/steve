import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { RoleAlias } from '@root/src/commands/Role Aliases/rolealias';
import { ApplyOptions } from '@skyra/decorators';
import { formatDate } from '@utils/util';
import { APIApplicationCommandGuildInteraction, APIInteractionApplicationCommandCallbackData, ApplicationCommandInteractionDataOptionRole } from 'discord-api-types/payloads/v8';
import { MessageEmbed } from 'discord.js';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: true
})
export default class extends ApplicationCommand {

	public async handle(interaction: APIApplicationCommandGuildInteraction): Promise<APIInteractionApplicationCommandCallbackData> {
		const guild = this.client.guilds.cache.get(interaction.guild_id)!;
		const role = guild.roles.cache.get((interaction.data.options![0] as ApplicationCommandInteractionDataOptionRole).value)!;
		const member = guild.members.cache.get(interaction.member.user.id) ?? await guild.members.fetch(interaction.member.user.id);

		if (role.isRestricted && !member.isStaff) throw guild.language.tget('commandRoleInfoRestricted');

		if (guild.memberCount !== guild.members.cache.size) await guild.members.fetch();

		let membersList = role.members.map(m => m.user.username).join(', ');

		membersList = membersList.length < 1
			? guild.language.tget('commandRoleInfoNoMembers')
			: membersList.length > 1024
				? guild.language.tget('commandRoleInfoTooMany')
				: membersList;

		let aliases: RoleAlias[] = guild.settings.get(GuildSettings.RoleAliases);
		const roleHasAlias = aliases.some(a => a.role === role.id);
		if (roleHasAlias) {
			aliases = aliases.filter(a => a.role === role.id);
		}

		const embedData = guild.language.tget('commandRoleInfoEmbed');

		const embed = new MessageEmbed();

		if (roleHasAlias) embed.addFields({ name: embedData.fieldTitles.aliases, value: aliases.map(a => a.alias).join(', ') });

		embed
			.addFields([
				{ name: embedData.fieldTitles.members(role.members.size), value: membersList }
			])
			.setColor(role.hexColor)
			.setDescription(embedData.description(role.name, formatDate(role.createdTimestamp)))
			.setFooter(embedData.footer(role.isAssignable))
			.setTimestamp();

		return { embeds: [embed.toJSON()] };
	}

}
