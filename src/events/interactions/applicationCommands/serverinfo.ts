import { ApplicationCommand, ApplicationCommandOptions } from '@lib/structures/events/ApplicationCommand';
import { ApplyOptions } from '@skyra/decorators';
import { formatDate, friendlyDuration } from '@utils/util';
import { APIApplicationCommandGuildInteraction, APIInteractionApplicationCommandCallbackData } from 'discord-api-types/payloads/v8';
import { MessageEmbed } from 'discord.js';

@ApplyOptions<ApplicationCommandOptions>({
	guildOnly: true
})
export default class extends ApplicationCommand {

	public async handle(interaction: APIApplicationCommandGuildInteraction): Promise<APIInteractionApplicationCommandCallbackData> {
		const guild = this.client.guilds.cache.get(interaction.guild_id)!;

		const embedData = guild.language.tget('commandServerInfoEmbed');

		const embed = new MessageEmbed()
			.addFields([
				{ name: embedData.fieldTitles.totalMembers, value: guild.memberCount, inline: true },
				{ name: embedData.fieldTitles.bots, value: guild.members.cache.filter(m => m.user.bot).size, inline: true },
				{ name: embedData.fieldTitles.textChannels, value: guild.channels.cache.filter(c => c.type === 'text').size, inline: true },
				{ name: embedData.fieldTitles.voiceChannels, value: guild.channels.cache.filter(c => c.type === 'voice').size, inline: true },
				{ name: embedData.fieldTitles.roles, value: guild.roles.cache.size, inline: true },
				{ name: embedData.fieldTitles.emojis, value: guild.emojis.cache.size, inline: true }
			])
			.setAuthor(guild.name, guild.iconURL()!)
			.setFooter(embedData.footer(formatDate(guild.createdTimestamp), friendlyDuration(Date.now() - guild.createdTimestamp)))
			.setTimestamp()
			.toJSON();

		return { embeds: [embed] };
	}

}
