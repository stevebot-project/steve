import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { Interaction, InteractionApplicationCommandCallbackResponseData } from '@lib/types/Interactions';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { ApplyOptions } from '@skyra/decorators';
import { getJoinDateString, userAccountCreated } from '@utils/UserInfo';
import { ColorResolvable, MessageEmbed } from 'discord.js';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: true
})
export default class extends ApplicationCommand {

	public async handle(interaction: Interaction): Promise<InteractionApplicationCommandCallbackResponseData> {
		const guild = this.client.guilds.cache.get(interaction.guild_id!)!;

		const userID = interaction.data!.options![0].value as string;
		const user = this.client.users.cache.get(userID) ?? await this.client.users.fetch(userID);
		const member = guild.members.cache.get(userID) ?? await guild.members.fetch(userID);

		const accountCreated = userAccountCreated(guild, member.user.createdTimestamp);

		const joinedGuild = getJoinDateString(guild, member.joinedTimestamp!);

		const embedData = guild.language.tget('commandWhoIsEmbed');

		const embed = new MessageEmbed()
			.addFields([
				{ name: embedData.fieldTitles.displayName, value: member.displayName, inline: true },
				{ name: embedData.fieldTitles.accountCreated, value: accountCreated, inline: true },
				{ name: embedData.fieldTitles.joinedGuild, value: joinedGuild, inline: true }
			])
			.setAuthor(user.tag, user.displayAvatarURL())
			.setColor(user.settings.get(UserSettings.EmbedColor) as ColorResolvable || 0x61e3f9)
			.setFooter(embedData.footer(member.id))
			.setTimestamp();

		if (member.roles.cache.size > 1) {
			embed.addFields([
				{
					name: embedData.fieldTitles.roles,
					// eslint-disable-next-line newline-per-chained-call
					value: member.roles.cache.filter(r => r.id !== r.guild.id).sort().array().join(' ')
				}
			]);
		}

		return { embeds: [embed] };
	}

}
