import { Event } from 'klasa';
import { Role, Message, TextChannel, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, getExecutor } from '@utils/util';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(oldRole: Role, newRole: Role): void {
		if (newRole.guild.settings.get(GuildSettings.LogEvents.RoleUpdate) as boolean) {
			const serverlog = newRole.guild.channels.cache.get(newRole.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;

			if (serverlog && serverlog.isGuildTextChannel()) {
				if (oldRole.name !== newRole.name) floatPromise(this, this.logRoleNameChange(oldRole, newRole, serverlog));
			}
		}
	}

	private async logRoleNameChange(oldRole: Role, newRole: Role, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(newRole.guild, 'ROLE_UPDATE');

		const embedData = newRole.guild.language.tget('eventRoleUpdateNameChangeEmbed');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.YELLOW)
			.setFooter(embedData.footer(newRole.id))
			.setTimestamp()
			.setTitle(embedData.title(oldRole.name, newRole.name));

		return serverlog.send(embed);
	}

}
