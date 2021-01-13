import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel, Role } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor, floatPromise } from '@utils/util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Event {

	public run(role: Role): void {
		if (role.guild.settings.get(GuildSettings.LogEvents.RoleCreate) as boolean) {
			const serverlog = role.guild.channels.cache.get(role.guild.settings.get(GuildSettings.Channels.Serverlog));
			if (serverlog && serverlog.isGuildTextChannel()) floatPromise(this, this.handleLog(role, serverlog));
		}
	}

	private async handleLog(role: Role, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(role.guild, 'ROLE_CREATE');

		const embedData = role.guild.language.tget('eventRolecreateEmbed');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.YELLOW)
			.setFooter(embedData.footer(role.id))
			.setTimestamp()
			.setTitle(embedData.title(role.name));

		return serverlog.send(embed);
	}

}
