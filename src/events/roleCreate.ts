import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel, Role } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor, floatPromise } from '@utils/Util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';

export default class extends Event {

	public run(role: Role): void {
		const serverlog = role.guild.channels.cache.get(role.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;
		if (serverlog) floatPromise(this, this.handleLog(role, serverlog));
	}

	private async handleLog(role: Role, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(role.guild, 'ROLE_CREATE');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.YELLOW)
			.setFooter(role.guild.language.get('EVENT_ROLE_FOOTER', role.id))
			.setTimestamp()
			.setTitle(role.guild.language.get('EVENT_ROLECREATE_TITLE', role.name));

		return serverlog.send(embed);
	}

}
