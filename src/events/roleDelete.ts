import { Event } from 'klasa';
import { Message, MessageEmbed, TextChannel, Role } from 'discord.js';
import { LogColors } from '@lib/types/Enums';
import { getExecutor, floatPromise } from '@utils/util';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { RoleAlias } from '../commands/Role Aliases/rolealias';
export default class extends Event {

	public run(role: Role): void {
		if (role.guild.settings.get(GuildSettings.LogEvents.RoleDelete) as boolean) {
			const serverlog = role.guild.channels.cache.get(role.guild.settings.get(GuildSettings.Channels.Serverlog));
			if (serverlog && serverlog.isGuildTextChannel()) floatPromise(this, this.handleLog(role, serverlog));
		}

		const aliases: RoleAlias[] = role.guild.settings.get(GuildSettings.RoleAliases);
		if (aliases.some(a => a.role === role.id)) floatPromise(this, this.handleAliases(aliases, role));
	}

	private async handleAliases(aliases: RoleAlias[], role: Role) {
		const matches = aliases.filter(a => a.role === role.id);

		for (const match of matches) {
			await role.guild.settings.update(GuildSettings.RoleAliases, match, { action: 'remove' });
		}
	}

	private async handleLog(role: Role, serverlog: TextChannel): Promise<Message> {
		const executor = await getExecutor(role.guild, 'ROLE_DELETE');

		const EMBED_DATA = role.guild.language.tget('EVENT_ROLEDELETE_EMBED');

		const embed = new MessageEmbed()
			.setAuthor(executor.tag, executor.displayAvatarURL())
			.setColor(LogColors.YELLOW)
			.setFooter(EMBED_DATA.FOOTER(role.id))
			.setTimestamp()
			.setTitle(EMBED_DATA.TITLE(role.name));

		return serverlog.send(embed);
	}

}
