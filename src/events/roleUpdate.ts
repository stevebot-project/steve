import { Event } from 'klasa';
import { Role, Message, TextChannel, MessageEmbed } from 'discord.js';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise, getExecutor } from '@utils/util';
import { LogColors } from '@lib/types/Enums';

export default class extends Event {

	public run(oldRole: Role, newRole: Role): void {
		const serverlog = newRole.guild.channels.cache.get(newRole.guild.settings.get(GuildSettings.Channels.Serverlog)) as TextChannel;

		if (serverlog) {
			if (oldRole.name !== newRole.name) floatPromise(this, this.logRoleNameChange(oldRole, newRole, serverlog));
		}
	}

	private async logRoleNameChange(oldRole: Role, newRole: Role, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(newRole.guild, 'ROLE_UPDATE');

		const EMBED_DATA = newRole.guild.language.tget('EVENT_ROLEUPDATE_NAMECHANGE_EMBED');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.YELLOW)
			.setFooter(EMBED_DATA.FOOTER(newRole.id))
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE(oldRole.name, newRole.name));

		return serverlog.send(embed);
	}

}
