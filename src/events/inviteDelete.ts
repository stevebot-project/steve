import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { floatPromise } from '@utils/util';
import { Invite, Message, MessageEmbed, NewsChannel, TextChannel } from 'discord.js';
import { Event } from 'klasa';
import { LogColors } from '../lib/types/Enums';

export default class extends Event {

	public run(invite: Invite): void {
		if (!invite.guild) return;

		if (invite.guild.settings.get(GuildSettings.LogEvents.InviteDelete) as boolean) {
			const serverlog = invite.guild.channels.cache.get(invite.guild.settings.get(GuildSettings.Channels.Serverlog));
			if (serverlog && serverlog.isGuildTextChannel()) floatPromise(this, this.handleLog(invite, serverlog));
		}
	}

	private handleLog(invite: Invite, serverlog: TextChannel | NewsChannel): Promise<Message> {
		const embedData = invite.guild!.language.tget('eventInvitedeleteEmbed');

		const embed = new MessageEmbed()
			.setColor(LogColors.BLUE)
			.setFooter(embedData.footer(invite.code))
			.setTimestamp()
			.setTitle(embedData.title(invite.channel.name));

		if (invite.inviter) embed.setAuthor(invite.inviter.tag, invite.inviter.displayAvatarURL());

		return serverlog.send(embed);
	}

}
