import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { CommandStore, KlasaMessage } from 'klasa';
import { GuildMember, Message, ColorResolvable } from 'discord.js';
import { UserSettings } from '@lib/types/settings/UserSettings';
import { Colors, Time } from '@lib/types/enums';
import { newEmbed, friendlyDuration, formatDate } from '@utils/util';
import { oneLine } from 'common-tags';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['member'],
			description: lang => lang.get('COMMAND_WHOIS_DESCRIPTION'),
			examples: ['whois', 'whois jonathan', 'whois boedj#5476'],
			extendedHelp: lang => lang.get('COMMAND_WHOIS_EXTENDEDHELP'),
			runIn: ['text'],
			usage: '[member:membername]',
			helpUsage: 'member'
		});

		this.createCustomResolver('membername', (str, possible, msg) => {
			const arg = this.client.arguments.get('membername');

			return str ? arg.run(str, possible, msg) : arg.run(msg.member.user.tag, possible, msg);
		});
	}

	public async run(msg: KlasaMessage, [targetMember]: [GuildMember]): Promise<Message> {
		if (!targetMember) throw msg.language.get('COMMAND_WHOIS_INVALIDMEMBER');
		const fetchedMember = await msg.guild.members.fetch(targetMember);

		const fetchedMemberRoles = fetchedMember.roles.cache.size > 1
			? fetchedMember.roles.cache.filter(r => r.id !== r.guild.id).sort().array().join(' ') : 'None';

		const fetchedMemberAccountAge = oneLine`${friendlyDuration(Date.now() - fetchedMember.user.createdTimestamp)} ago
			(${formatDate(fetchedMember.user.createdTimestamp)})`;

		let fetchedMemberJoinedServer: string;
		const timeSinceJoin = Date.now() - fetchedMember.joinedTimestamp;
		const joinedDate = formatDate(fetchedMember.joinedTimestamp);

		if (timeSinceJoin > Time.Day && timeSinceJoin < Time.Hour * 31) {
			fetchedMemberJoinedServer = `${Math.floor(timeSinceJoin / Time.Hour)} hours ago (${joinedDate})`;
		} else {
			fetchedMemberJoinedServer = oneLine`${friendlyDuration(timeSinceJoin)} ago (${joinedDate})`;
		}

		const embed = newEmbed()
			.setAuthor(fetchedMember.user.tag, fetchedMember.user.displayAvatarURL())
			.setColor(fetchedMember.user.settings.get(UserSettings.EmbedColor) as ColorResolvable || Colors.Turquoise)
			.setTimestamp()
			.setFooter(`Member ID: ${fetchedMember.id}`)
			.addFields([
				{ name: 'Display Name', value: fetchedMember.displayName, inline: true },
				{ name: 'Account Created', value: fetchedMemberAccountAge, inline: true },
				{ name: 'Joined Server', value: fetchedMemberJoinedServer, inline: true },
				{ name: 'Roles', value: fetchedMemberRoles }
			]);

		return msg.channel.send(embed);
	}

}
